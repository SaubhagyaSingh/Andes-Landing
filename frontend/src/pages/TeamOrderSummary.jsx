import { useState, useMemo, useCallback, useEffect } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functions, db } from '../firebase';
import { collection, addDoc, onSnapshot, serverTimestamp, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './TeamOrderSummary.css';

// ==========================================
// ITEM DEFINITIONS WITH PRICES
// ==========================================
const ITEM_CATEGORIES = [
  {
    title: 'Bedsheets & Covers',
    items: [
      { key: 'single_bedsheet', name: 'Single Bedsheet', price: 30 },
      { key: 'double_bedsheet', name: 'Double Bedsheet', price: 45 },
      { key: 'duvet_cover', name: 'Duvet Cover', price: 30 },
      { key: 'pillow_cover', name: 'Pillow Cover', price: 10 },
      { key: 'blanket', name: 'Blanket', price: 110 },
    ],
  },
  {
    title: 'Towels & Mats',
    items: [
      { key: 'bath_towel', name: 'Bath Towel', price: 20 },
      { key: 'hand_towel', name: 'Hand Towel', price: 10 },
      { key: 'face_towel', name: 'Face Towel', price: 10 },
      { key: 'bath_mat', name: 'Bath Mat', price: 20 },
      { key: 'door_mat', name: 'Door Mat', price: 49 },
    ],
  },
  {
    title: 'Other',
    items: [
      { key: 'curtain', name: 'Curtain', price: 75 },
    ],
  },
];

const ALL_ITEMS = ITEM_CATEGORIES.flatMap((c) => c.items);

const HOSTEL_PHONE = '918485820252';

// ==========================================
// FIREBASE ITEM NAME → INTERNAL KEY MAPPING
// (case-insensitive, handles variants)
// ==========================================
const FIREBASE_NAME_TO_KEY = {
  'single bedsheet':  'single_bedsheet',
  'double bedsheet':  'double_bedsheet',
  'duvet cover':      'duvet_cover',
  'pillow cover':     'pillow_cover',
  'blanket':          'blanket',
  'bath towel':       'bath_towel',
  'bath towels':      'bath_towel',
  'hand towel':       'hand_towel',
  'face towel':       'face_towel',
  'bath mat':         'bath_mat',
  'door mat':         'door_mat',
  'curtain':          'curtain',
};

function firebaseNameToKey(name) {
  return FIREBASE_NAME_TO_KEY[name.toLowerCase().trim()] || null;
}

// ==========================================
// HELPERS
// ==========================================

// Helper: create empty counts for one hostel
function createEmptyCounts() {
  const counts = {};
  ALL_ITEMS.forEach((item) => {
    counts[item.key] = 0;
  });
  return counts;
}

// Helper: format today's date (readable)
function formatDate() {
  const d = new Date();
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Helper: format a Date object to readable
function formatDateReadable(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Helper: get today as YYYY-MM-DD
function getTodayStr() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// Helper: get default delivery date (2 days from now)
function getDefaultDeliveryDate() {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().split('T')[0];
}

// ==========================================
// TABS
// ==========================================
const TABS = [
  { key: 'before_pickup', label: 'Before Pickup', icon: '🔔' },
  { key: 'order_summary', label: 'Order Summary', icon: '📋' },
];

// ==========================================
// COUNTER COMPONENT
// ==========================================
function ItemCounter({ value, onChange }) {
  return (
    <div className="item-counter">
      <button
        className="counter-btn decrement"
        onClick={() => onChange(Math.max(0, value - 1))}
        aria-label="Decrease"
      >
        −
      </button>
      <span className={`counter-value ${value > 0 ? 'has-value' : ''}`}>
        {value}
      </span>
      <button
        className="counter-btn increment"
        onClick={() => onChange(value + 1)}
        aria-label="Increase"
      >
        +
      </button>
    </div>
  );
}

// ==========================================
// HOSTEL CARD COMPONENT
// ==========================================
function HostelCard({ hostel, index, onNameChange, onCountChange, onDelete, canDelete }) {
  return (
    <div className="hostel-card" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="hostel-card-header">
        <input
          className="hostel-name-input"
          type="text"
          value={hostel.name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Enter hostel name..."
        />
        {canDelete && (
          <button
            className="hostel-delete-btn"
            onClick={onDelete}
            aria-label="Remove hostel"
            title="Remove this hostel"
          >
            ✕
          </button>
        )}
      </div>

      {ITEM_CATEGORIES.map((category) => (
        <div key={category.title} className="item-category">
          <div className="item-category-title">{category.title}</div>
          {category.items.map((item) => (
            <div key={item.key} className="item-row">
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <span className="item-price">₹{item.price}/pc</span>
              </div>
              <ItemCounter
                value={hostel.counts[item.key]}
                onChange={(newVal) => onCountChange(item.key, newVal)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ==========================================
// BEFORE PICKUP FORM COMPONENT
// ==========================================
function BeforePickupForm({ pickupTime, setPickupTime, deliveryDate, setDeliveryDate }) {
  return (
    <div className="hostel-card" style={{ animationDelay: '0s' }}>
      <div className="before-pickup-header">
        <span className="before-pickup-icon">🔔</span>
        <h2 className="before-pickup-title">Pickup Notification</h2>
      </div>
      <p className="before-pickup-desc">
        Send a reminder to Hostel 99 team about today's pickup schedule and linen delivery date.
      </p>

      <div className="before-pickup-fields">
        <div className="field-group">
          <label className="field-label" htmlFor="pickup-time">
            <span className="field-label-icon">🕐</span>
            Pickup &amp; Delivery Time
          </label>
          <input
            id="pickup-time"
            className="hostel-name-input"
            type="time"
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
          />
          <span className="field-hint">
            e.g. 11:45 AM — when pickup and delivery will be completed today
          </span>
        </div>

        <div className="field-group">
          <label className="field-label" htmlFor="delivery-date">
            <span className="field-label-icon">📅</span>
            Linen Delivery Date
          </label>
          <input
            id="delivery-date"
            className="hostel-name-input"
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
          <span className="field-hint">
            Date when washed &amp; ironed linens will be delivered back
          </span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// ORDER DATE TOOLBAR COMPONENT
// ==========================================
function OrderDateToolbar({ selectedDate, onDateChange, onRefresh, loading, orderCount }) {
  return (
    <div className="order-date-toolbar">
      <div className="order-date-toolbar-left">
        <span className="order-date-icon">📅</span>
        <div className="order-date-label-group">
          <span className="order-date-label">Orders for</span>
          <input
            type="date"
            className="order-date-input"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
        {!loading && orderCount !== null && (
          <span className={`order-count-badge ${orderCount === 0 ? 'empty' : ''}`}>
            {orderCount === 0 ? 'No orders found' : `${orderCount} hostel${orderCount !== 1 ? 's' : ''} fetched`}
          </span>
        )}
      </div>
      <button
        className={`refresh-btn ${loading ? 'loading' : ''}`}
        onClick={onRefresh}
        disabled={loading}
        title="Refresh orders from Firebase"
      >
        {loading ? (
          <div className="spinner" />
        ) : (
          <span className="refresh-icon">↻</span>
        )}
        {loading ? 'Fetching...' : 'Refresh'}
      </button>
    </div>
  );
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
export default function TeamOrderSummary() {
  const { currentUser } = useAuth();

  const isAuthorized = useMemo(() => {
    if (!currentUser || !currentUser.email) return false;
    const allowedEmails = [
      'ceo@andes.co.in',
      'andesnow1604@gmail.com',
      'signaturegrowthcapital@andes.co.in'
    ];
    return allowedEmails.includes(currentUser.email.toLowerCase());
  }, [currentUser]);

  // Tab state
  const [activeTab, setActiveTab] = useState('before_pickup');

  // Before Pickup state
  const [pickupTime, setPickupTime] = useState('11:45');
  const [deliveryDate, setDeliveryDate] = useState(getDefaultDeliveryDate);

  // Order Summary state
  const [hostels, setHostels] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [orderCount, setOrderCount] = useState(null); // null = not fetched yet

  // Selected date for order fetch (default = today)
  const [selectedDate, setSelectedDate] = useState(getTodayStr);

  // Shared state
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // ==========================================
  // FETCH ORDERS FROM FIREBASE
  // ==========================================
  const fetchOrders = useCallback(async (dateStr) => {
    setFetchLoading(true);
    setOrderCount(null);

    try {
      // Build start / end of the selected date (local midnight → local 23:59:59)
      const start = new Date(dateStr + 'T00:00:00');
      const end   = new Date(dateStr + 'T23:59:59');

      const q = query(
        collection(db, 'b2b_orders'),
        where('createdAt', '>=', Timestamp.fromDate(start)),
        where('createdAt', '<=', Timestamp.fromDate(end))
      );

      const snapshot = await getDocs(q);

      // Aggregate per hostel (partnerName containing "Hostel99")
      const hostelMap = {}; // partnerName → aggregated counts

      snapshot.forEach((doc) => {
        const data = doc.data();
        const partnerName = data.partnerName || '';

        // Only Hostel99 orders
        if (!partnerName.toLowerCase().includes('hostel99')) return;

        const partnerItems = data.partnerItems || {};

        if (!hostelMap[partnerName]) {
          hostelMap[partnerName] = createEmptyCounts();
        }

        // Sum quantities
        Object.entries(partnerItems).forEach(([fbName, qty]) => {
          const key = firebaseNameToKey(fbName);
          if (key && typeof qty === 'number') {
            hostelMap[partnerName][key] += qty;
          }
        });
      });

      // Convert to hostels array, sorted by name
      const fetched = Object.entries(hostelMap)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name, counts]) => ({ name, counts }));

      if (fetched.length === 0) {
        setHostels([{ name: '', counts: createEmptyCounts() }]);
        setOrderCount(0);
        toast.info('No Hostel99 orders found for this date.');
      } else {
        setHostels(fetched);
        setOrderCount(fetched.length);
        toast.success(`✅ Loaded ${fetched.length} hostel${fetched.length !== 1 ? 's' : ''} from Firebase.`);
      }
    } catch (err) {
      console.error('Error fetching b2b_orders:', err);
      toast.error('Failed to fetch orders. Check console.');
      setHostels([{ name: '', counts: createEmptyCounts() }]);
      setOrderCount(null);
    } finally {
      setFetchLoading(false);
    }
  }, []);

  // Auto-fetch when the Order Summary tab becomes active or date changes
  useEffect(() => {
    if (activeTab === 'order_summary') {
      fetchOrders(selectedDate);
    }
  }, [activeTab, selectedDate, fetchOrders]);

  if (!isAuthorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0e1a] text-white p-6 text-center">
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
        <h1 className="text-2xl font-bold mb-2 text-red-500">Access Denied</h1>
        <p className="text-gray-400 max-w-sm">You do not have permission to view the Team Order Summary page. Please contact your administrator.</p>
      </div>
    );
  }

  // --- Order Summary Handlers ---
  const handleNameChange = useCallback((index, name) => {
    setHostels((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], name };
      return updated;
    });
  }, []);

  const handleCountChange = useCallback((hostelIndex, itemKey, value) => {
    setHostels((prev) => {
      const updated = [...prev];
      updated[hostelIndex] = {
        ...updated[hostelIndex],
        counts: { ...updated[hostelIndex].counts, [itemKey]: value },
      };
      return updated;
    });
  }, []);

  const handleAddHostel = useCallback(() => {
    setHostels((prev) => [
      ...prev,
      { name: '', counts: createEmptyCounts() },
    ]);
  }, []);

  const handleDeleteHostel = useCallback((index) => {
    setHostels((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleDateChange = useCallback((newDate) => {
    setSelectedDate(newDate);
    // useEffect will trigger fetchOrders automatically
  }, []);

  const handleRefresh = useCallback(() => {
    fetchOrders(selectedDate);
  }, [fetchOrders, selectedDate]);

  // --- Build Before Pickup Data ---
  const beforePickupData = useMemo(() => {
    if (!pickupTime || !deliveryDate) return null;

    // Format time from 24h to 12h
    const [hours, minutes] = pickupTime.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    const timeStr = `${h12}:${minutes} ${ampm}`;

    const deliveryDateStr = formatDateReadable(deliveryDate);

    // Template parameters for hostel_before_pickup
    const params = [timeStr, deliveryDateStr];

    // Preview message (for the sidebar)
    const preview = `Hello Hostel99 Team,\n\nLaundry pickup and delivery will be completed today by ${timeStr}. Kindly keep your laundry ready.\n\nThe linens picked up today will be washed, ironed, and delivered by ${deliveryDateStr}.\n\nThank you,\nAndes Team 💙`;

    return { params, preview };
  }, [pickupTime, deliveryDate]);

  // --- Build Order Summary Data ---
  const orderSummaryData = useMemo(() => {
    const dateStr = formatDateReadable(selectedDate) || formatDate();
    const hostelParts = [];

    hostels.forEach((hostel) => {
      const itemParts = [];
      ALL_ITEMS.forEach((item) => {
        const count = hostel.counts[item.key];
        if (count > 0) {
          let displayName = item.name;
          if (count > 1) {
            if (displayName.endsWith('h')) displayName += 'es';
            else if (!displayName.endsWith('s')) displayName += 's';
          }
          itemParts.push(`${displayName}: ${count}`);
        }
      });

      if (itemParts.length > 0) {
        const hostelName = hostel.name.trim() || 'Unnamed Hostel';
        hostelParts.push(`🔹 ${hostelName} (${itemParts.join(', ')})`);
      }
    });

    if (hostelParts.length === 0) return null;

    // Join with double spaces to separate hostels clearly on a single line
    const hostelDetails = hostelParts.join('   ');

    // Template parameters for hostel_order_summary (no newlines allowed in parameters!)
    const params = [dateStr, hostelDetails];

    // Preview message (for the sidebar)
    const preview = `Hello Hostel 99 Team,\n\nToday ${dateStr} pickup details are as follows:\n\n${hostelDetails}\n\nIf there are any issues, please report them within 24 hours.\n\nThank you,\nTeam Andes 💙`;

    return { params, preview };
  }, [hostels, selectedDate]);

  // Current data based on active tab
  const currentData = activeTab === 'before_pickup' ? beforePickupData : orderSummaryData;
  const message = currentData?.preview || '';

  // --- Send Handler ---
  const handleSend = async () => {
    if (!currentData) {
      toast.error(
        activeTab === 'before_pickup'
          ? 'Please fill in pickup time and delivery date.'
          : 'Please add at least one item to send.'
      );
      return;
    }

    // For order summary, check named hostels
    if (activeTab === 'order_summary') {
      const unnamedHostel = hostels.find(
        (h) =>
          !h.name.trim() &&
          ALL_ITEMS.some((item) => h.counts[item.key] > 0)
      );
      if (unnamedHostel) {
        toast.error('Please name all hostels that have items.');
        return;
      }
    }

    setSending(true);
    setSent(false);

    // Pick template name based on active tab
    const templateName = activeTab === 'before_pickup'
      ? 'hostel_before_pickup'
      : 'hostel_order_summary';

    try {
      const docRef = await addDoc(collection(db, 'hostel_messages'), {
        to: HOSTEL_PHONE,
        type: 'template',
        templateName: templateName,
        parameters: currentData.params,
        status: 'pending',
        createdAt: serverTimestamp(),
      });

      // Subscribe to real-time updates of this message to know when it is sent or fails
      const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.status === 'sent') {
            setSent(true);
            toast.success('✅ WhatsApp message sent successfully!');
            setTimeout(() => setSent(false), 3000);
            setSending(false);
            unsubscribe();
          } else if (data.status === 'failed') {
            toast.error(`Failed to send message: ${typeof data.error === 'object' ? JSON.stringify(data.error) : (data.error || 'Unknown error')}`);
            console.error('WhatsApp Error:', data.error);
            setSending(false);
            unsubscribe();
          }
        }
      }, (err) => {
        toast.error('Error listening to message status.');
        console.error('Firestore snapshot listener error:', err);
        setSending(false);
      });

    } catch (error) {
      toast.error('Error creating queue message. Check console.');
      console.error('Firestore Add Error:', error);
      setSending(false);
    }
  };

  return (
    <div className="team-order-page">
      {/* Header */}
      <header className="team-order-header">
        <div className="team-order-header-left">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="#6366f1" fillOpacity="0.15"/>
            <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="#818cf8" fontSize="18" fontWeight="700">A</text>
          </svg>
          <h1>Team Order Summary</h1>
        </div>
        <span className="team-date-badge">📅 {formatDate()}</span>
      </header>

      {/* Tab Switcher */}
      <div className="tab-bar">
        <div className="tab-bar-inner">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="team-order-content">
        {/* Left: Form Area */}
        <div className="team-order-hostels">
          {activeTab === 'before_pickup' ? (
            <BeforePickupForm
              pickupTime={pickupTime}
              setPickupTime={setPickupTime}
              deliveryDate={deliveryDate}
              setDeliveryDate={setDeliveryDate}
            />
          ) : (
            <>
              {/* Date Picker + Refresh Toolbar */}
              <OrderDateToolbar
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                onRefresh={handleRefresh}
                loading={fetchLoading}
                orderCount={orderCount}
              />

              {/* Loading State */}
              {fetchLoading ? (
                <div className="fetch-loading-card">
                  <div className="fetch-spinner" />
                  <span>Fetching Hostel99 orders from Firebase…</span>
                </div>
              ) : (
                <>
                  {hostels.map((hostel, index) => (
                    <HostelCard
                      key={index}
                      hostel={hostel}
                      index={index}
                      onNameChange={(name) => handleNameChange(index, name)}
                      onCountChange={(itemKey, value) =>
                        handleCountChange(index, itemKey, value)
                      }
                      onDelete={() => handleDeleteHostel(index)}
                      canDelete={hostels.length > 1}
                    />
                  ))}

                  <button className="add-hostel-btn" onClick={handleAddHostel}>
                    <span style={{ fontSize: '1.2rem' }}>+</span>
                    Add Hostel
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {/* Right: Sidebar */}
        <div className="team-order-sidebar">
          {/* Message Preview */}
          <div className="message-preview-card">
            <div className="message-preview-title">
              <span>📱</span> Message Preview
            </div>
            {message ? (
              <div className="message-preview-bubble">{message}</div>
            ) : (
              <div className="empty-preview">
                <div className="empty-preview-icon">📋</div>
                {activeTab === 'before_pickup'
                  ? 'Fill in the details to see the message preview'
                  : fetchLoading
                    ? 'Loading orders…'
                    : 'Add items to see the message preview'}
              </div>
            )}
          </div>

          {/* Send Section */}
          <div className="send-section">
            <div className="send-to-info">
              <span className="send-to-icon">🏨</span>
              <div className="send-to-details">
                <span className="send-to-label">Sending to</span>
                <span className="send-to-number">Hostel 99 · +91 84858 20252</span>
              </div>
            </div>
            <button
              className={`send-btn ${sending ? 'sending' : ''} ${sent ? 'success' : ''}`}
              onClick={handleSend}
              disabled={sending || !message || fetchLoading}
            >
              {sending ? (
                <>
                  <div className="spinner" />
                  Sending...
                </>
              ) : sent ? (
                <>
                  <span className="send-btn-icon">✓</span>
                  Sent!
                </>
              ) : (
                <>
                  <span className="send-btn-icon">📨</span>
                  Send via WhatsApp
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
