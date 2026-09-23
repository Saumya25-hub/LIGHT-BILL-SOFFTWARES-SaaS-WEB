import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileText,
  RotateCcw,
  ShoppingCart,
  Package,
  Users,
  Layers,
  BookOpen,
  BarChart3,
  UserCheck,
  BookTemplate,
  Settings,
  Bell,
  Lock,
  Plus,
  Search,
  RefreshCw,
  Printer,
  X,
  QrCode,
  Calendar,
  FileSpreadsheet,
  ArrowLeft,
  Zap,
  Check,
  ChevronDown,
  ChevronUp,
  DollarSign,
  CheckCircle2,
  CalendarDays
} from 'lucide-react';

export const SignaturesSoftwareSimulator: React.FC = () => {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'sales' | 'sales_return' | 'purchase' | 'purchase_return' | 'products' | 'parties' | 'stock' | 'ledger' | 'reports' | 'ems' | 'catalog' | 'settings'
  >('dashboard');

  // Day / Night mode toggle inside simulator
  const [isNightMode, setIsNightMode] = useState(false);

  // Sales View sub-mode: 'list' or 'new_sale'
  const [salesMode, setSalesMode] = useState<'list' | 'new_sale'>('list');

  // Products filter
  const [productFilter, setProductFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Stock filter
  const [stockFilter, setStockFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');

  // Parties filter
  const [partiesFilter, setPartiesFilter] = useState<'all' | 'customers' | 'suppliers' | 'both'>('all');

  // Sales Period Filter
  const [salesPeriod, setSalesPeriod] = useState<'all' | 'today' | 'this_month' | 'custom'>('all');

  // Invoice Print Preview Modal State
  const [previewInvoice, setPreviewInvoice] = useState<{
    invoiceNo: string;
    date: string;
    customer: string;
    phone: string;
    gstin: string;
    amount: number;
    itemsCount: number;
  } | null>(null);
  const [previewFormat, setPreviewFormat] = useState<'A4' | 'Thermal'>('A4');

  // Invoice Line Item Interface
  interface InvoiceLineItem {
    id: string;
    name: string;
    unit: string;
    hsn: string;
    qty: number;
    rate: number;
    discountPercent: number;
    gstPercent: number;
    pricingMode: 'include_gst' | '+ GST';
    taxable: number;
    cgst: number;
    sgst: number;
    amount: number;
  }

  const computeLineItem = (
    name: string,
    unit: string,
    hsn: string,
    rate: number,
    qty: number,
    discountPercent: number,
    gstPercent: number,
    pricingMode: 'include_gst' | '+ GST'
  ): InvoiceLineItem => {
    const discountAmount = (rate * discountPercent) / 100;
    const effectiveRate = rate - discountAmount;

    let taxable = 0;
    let totalGst = 0;
    let amount = 0;

    if (pricingMode === 'include_gst') {
      amount = effectiveRate * qty;
      taxable = amount / (1 + gstPercent / 100);
      totalGst = amount - taxable;
    } else {
      taxable = effectiveRate * qty;
      totalGst = taxable * (gstPercent / 100);
      amount = taxable + totalGst;
    }

    const cgst = totalGst / 2;
    const sgst = totalGst / 2;

    return {
      id: Math.random().toString(36).substring(2, 9),
      name,
      unit,
      hsn,
      qty,
      rate,
      discountPercent,
      gstPercent,
      pricingMode,
      taxable: parseFloat(taxable.toFixed(2)),
      cgst: parseFloat(cgst.toFixed(2)),
      sgst: parseFloat(sgst.toFixed(2)),
      amount: parseFloat(amount.toFixed(2)),
    };
  };

  // Products Data matching Screenshot 1 (Dynamic state for adding products)
  const [productsList, setProductsList] = useState([
    { id: 1, name: '9 tar', hsn: '', unit: 'KG', purchaseRate: 0.0, saleRate: 400.0, mrp: 0.0, gst: '5%', stock: -659, status: 'Active' },
    { id: 2, name: 'l9b', hsn: '', unit: 'PCS', purchaseRate: 0.0, saleRate: 200.0, mrp: 0.0, gst: '5%', stock: 943, status: 'Active' },
  ]);

  // Parties Data matching Screenshot 4 (Dynamic state for adding parties)
  const [partiesList, setPartiesList] = useState([
    { code: 'CUS-0002', name: 'A1 TEXTILE HUB', type: 'Customer', phone: '98765 43210', city: 'Surat', gstin: 'Unregistered', balance: 0.0, status: 'Active' },
    { code: 'CUS-0001', name: 'SHREE HARI ENTERPRISE', type: 'Customer', phone: '98250 99887', city: 'Surat', gstin: '24AAAAA0000A1Z5 Regular', balance: 0.0, status: 'Active' },
    { code: 'SUP-0001', name: 'METRO PRINTS', type: 'Supplier', phone: '98241 88990', city: 'Surat', gstin: 'Unregistered', balance: 0.0, status: 'Active' },
    { code: 'CUS-0003', name: 'ROYAL DRY FRUITS', type: 'Customer', phone: '98980 12345', city: 'Surat', gstin: '24ABCDE5678G1Z9 Regular', balance: 0.0, status: 'Active' },
  ]);

  // Sales Invoices Data matching Screenshot 3 (Sanitized dummy invoices)
  const [salesList, setSalesList] = useState([
    { no: '26-27/INV/011', date: '23-09-2026', customer: 'A1 TEXTILE HUB', gstin: '', items: '11 units', amount: 4200.0, status: 'Unpaid' },
    { no: '26-27/INV/010', date: '22-09-2026', customer: 'ROYAL DRY FRUITS', gstin: '24ABCDE5678G1Z9', items: '9 units', amount: 3400.0, status: 'Unpaid' },
    { no: '26-27/INV/009', date: '21-09-2026', customer: 'SHREE HARI ENTERPRISE', gstin: '24AAAAA0000A1Z5', items: '100 units', amount: 30000.0, status: 'Unpaid' },
    { no: '26-27/INV/008', date: '19-11-2026', customer: 'A1 TEXTILE HUB', gstin: '', items: '99 units', amount: 39600.0, status: 'Unpaid' },
    { no: '26-27/INV/007', date: '01-10-2026', customer: 'SHREE HARI ENTERPRISE', gstin: '24AAAAA0000A1Z5', items: '500 units', amount: 200000.0, status: 'Unpaid' },
    { no: '26-27/INV/006', date: '21-09-2026', customer: 'A1 TEXTILE HUB', gstin: '', items: '1 units', amount: 400.0, status: 'Unpaid' },
    { no: '26-27/INV/005', date: '19-09-2026', customer: 'A1 TEXTILE HUB', gstin: '', items: '71 units', amount: 28400.0, status: 'Unpaid' },
    { no: '26-27/INV/004', date: '30-09-2026', customer: 'SHREE HARI ENTERPRISE', gstin: '24AAAAA0000A1Z5', items: '70 units', amount: 28000.0, status: 'Unpaid' },
    { no: '26-27/INV/003', date: '26-09-2026', customer: 'SHREE HARI ENTERPRISE', gstin: '24AAAAA0000A1Z5', items: '50 units', amount: 20000.0, status: 'Unpaid' },
    { no: '26-27/INV/002', date: '22-09-2026', customer: 'SHREE HARI ENTERPRISE', gstin: '24AAAAA0000A1Z5', items: '800 units', amount: 320000.0, status: 'Unpaid' },
    { no: '26-27/INV/001', date: '19-09-2026', customer: 'SHREE HARI ENTERPRISE', gstin: '24AAAAA0000A1Z5', items: '5 units', amount: 2000.0, status: 'Unpaid' },
  ]);

  // New Sale Form State matching Screenshots 1-4
  const [saleInvoiceNo, setSaleInvoiceNo] = useState('26-27/INV/012');
  const [saleDate, setSaleDate] = useState('23-09-2026');
  const [saleCustomer, setSaleCustomer] = useState('A1 TEXTILE HUB');
  const [saleCustomerPhone, setSaleCustomerPhone] = useState('98765 43210');
  const [saleCustomerGstin, setSaleCustomerGstin] = useState('Unregistered');
  const [customerAddress, setCustomerAddress] = useState('Address: S, S, S, Gujarat - 395001');
  const [isCustomerCollapsed, setIsCustomerCollapsed] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState('');

  // Invoice Items matching Screenshot 4
  const [newSaleItems, setNewSaleItems] = useState<InvoiceLineItem[]>([
    computeLineItem('9 tar', 'KG', '', 400, 1, 0, 5, 'include_gst'),
  ]);

  // Payment Status & Notes matching Screenshot 4
  const [paymentStatus, setPaymentStatus] = useState<'Unpaid' | 'Paid' | 'Partially Paid'>('Unpaid');
  const [amountReceived, setAmountReceived] = useState(0);
  const [invoiceNotes, setInvoiceNotes] = useState('');

  // Modals state for product selection and adding (Screenshots 2 & 3)
  const [showSelectProductModal, setShowSelectProductModal] = useState(false);
  const [searchProductQuery, setSearchProductQuery] = useState('');
  const [selectedProductIdInModal, setSelectedProductIdInModal] = useState<number>(1);

  const [showAddToInvoiceModal, setShowAddToInvoiceModal] = useState(false);
  const [modalProduct, setModalProduct] = useState<{ id: number; name: string; unit: string; hsn: string; rate: number; gst: number } | null>(null);
  const [modalProductRate, setModalProductRate] = useState<number>(400);
  const [modalProductPricing, setModalProductPricing] = useState<'include_gst' | '+ GST'>('include_gst');
  const [modalProductGst, setModalProductGst] = useState<number>(5);
  const [modalProductQty, setModalProductQty] = useState<number>(1);
  const [modalProductDiscount, setModalProductDiscount] = useState<number>(0);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Live Billing Calculations matching Screenshot 4
  const subtotalBeforeDiscTax = newSaleItems.reduce((acc, it) => acc + it.rate * it.qty, 0);
  const totalDiscount = newSaleItems.reduce((acc, it) => acc + ((it.rate * it.discountPercent) / 100) * it.qty, 0);
  const taxableAmount = newSaleItems.reduce((acc, it) => acc + it.taxable, 0);
  const totalCgst = newSaleItems.reduce((acc, it) => acc + it.cgst, 0);
  const totalSgst = newSaleItems.reduce((acc, it) => acc + it.sgst, 0);
  const rawGrandTotal = taxableAmount + totalCgst + totalSgst;
  const grandTotal = newSaleItems.length > 0 ? Math.round(rawGrandTotal) : 0;
  const roundOff = newSaleItems.length > 0 ? parseFloat((grandTotal - rawGrandTotal).toFixed(2)) : 0;
  const balanceDue =
    paymentStatus === 'Paid' ? 0 : paymentStatus === 'Partially Paid' ? Math.max(0, grandTotal - amountReceived) : grandTotal;
  const totalQuantity = newSaleItems.reduce((acc, it) => acc + it.qty, 0);

  const handleCreateBill = () => {
    if (newSaleItems.length === 0) return;
    const newInv = {
      no: saleInvoiceNo,
      date: saleDate,
      customer: saleCustomer,
      gstin: saleCustomerGstin,
      items: `${totalQuantity} units`,
      amount: grandTotal,
      status: (paymentStatus === 'Paid' ? 'Paid' : 'Unpaid') as 'Paid' | 'Unpaid',
    };
    setSalesList([newInv, ...salesList]);
    setPreviewInvoice({
      invoiceNo: newInv.no,
      date: newInv.date,
      customer: newInv.customer,
      phone: saleCustomerPhone,
      gstin: newInv.gstin,
      amount: newInv.amount,
      itemsCount: newSaleItems.length,
    });
    setSalesMode('list');
  };

  const handleCustomerChange = (custName: string) => {
    setSaleCustomer(custName);
    const found = partiesList.find((p) => p.name === custName);
    if (found) {
      setSaleCustomerPhone(found.phone);
      setSaleCustomerGstin(found.gstin);
      setCustomerAddress(`Address: S, S, S, Gujarat - 395001`);
    }
  };

  const openSelectProductModal = () => {
    setShowSelectProductModal(true);
    setSearchProductQuery('');
    setSelectedProductIdInModal(productsList[0]?.id || 1);
  };

  const openAddToInvoiceModal = (product: { id: number; name: string; unit: string; hsn: string; saleRate: number; gst: string }) => {
    setShowSelectProductModal(false);
    const gstVal = parseInt(product.gst) || 5;
    setModalProduct({
      id: product.id,
      name: product.name,
      unit: product.unit,
      hsn: product.hsn,
      rate: product.saleRate,
      gst: gstVal,
    });
    setModalProductRate(product.saleRate);
    setModalProductPricing('include_gst');
    setModalProductGst(gstVal);
    setModalProductQty(1);
    setModalProductDiscount(0);
    setEditingItemId(null);
    setShowAddToInvoiceModal(true);
  };

  const handleEditItem = (item: InvoiceLineItem) => {
    setModalProduct({
      id: 99,
      name: item.name,
      unit: item.unit,
      hsn: item.hsn,
      rate: item.rate,
      gst: item.gstPercent,
    });
    setModalProductRate(item.rate);
    setModalProductPricing(item.pricingMode);
    setModalProductGst(item.gstPercent);
    setModalProductQty(item.qty);
    setModalProductDiscount(item.discountPercent);
    setEditingItemId(item.id);
    setShowAddToInvoiceModal(true);
  };

  const handleSaveModalItem = () => {
    if (!modalProduct) return;
    const computed = computeLineItem(
      modalProduct.name,
      modalProduct.unit,
      modalProduct.hsn,
      modalProductRate,
      modalProductQty,
      modalProductDiscount,
      modalProductGst,
      modalProductPricing
    );

    if (editingItemId) {
      setNewSaleItems(newSaleItems.map((it) => (it.id === editingItemId ? { ...computed, id: editingItemId } : it)));
    } else {
      setNewSaleItems([...newSaleItems, computed]);
    }
    setShowAddToInvoiceModal(false);
    setEditingItemId(null);
  };

  const handleRemoveItem = (id: string) => {
    setNewSaleItems(newSaleItems.filter((it) => it.id !== id));
  };

  // =========================================================================
  // MODALS & FORMS STATE (Add Party, Add Product, Ctrl+K, Festival, EMS)
  // =========================================================================

  // 1. Add Party Modal State (Screenshots 1 & 2)
  const [showAddPartyModal, setShowAddPartyModal] = useState(false);
  const [newPartyForm, setNewPartyForm] = useState({
    code: 'CUS-0004',
    name: '',
    type: 'Customer' as 'Customer' | 'Supplier' | 'Both',
    contactPerson: '',
    phone: '',
    alternatePhone: '',
    email: '',
    gstRegistration: 'Unregistered' as 'Unregistered' | 'Regular' | 'Composition',
    gstin: '',
    state: '24 - Gujarat',
    pan: '',
    legalName: '',
    tradeName: '',
    addressLine1: '',
    addressLine2: '',
    city: 'Surat',
    pincode: '395001',
    openingBalance: 0,
    balanceType: 'Receivable' as 'Receivable' | 'Payable',
    creditLimit: 0,
    paymentTerms: '30 Days',
    isActive: true,
  });

  const handleSaveNewParty = () => {
    if (!newPartyForm.name.trim()) {
      alert('Please enter Party Name');
      return;
    }
    const createdParty = {
      code: newPartyForm.code,
      name: newPartyForm.name.trim(),
      type: newPartyForm.type,
      phone: newPartyForm.phone || '98980 00000',
      city: newPartyForm.city || 'Surat',
      gstin: newPartyForm.gstRegistration === 'Unregistered' ? 'Unregistered' : (newPartyForm.gstin || '24AAAAA0000A1Z5 Regular'),
      balance: newPartyForm.openingBalance,
      status: newPartyForm.isActive ? 'Active' : 'Inactive',
    };
    setPartiesList([createdParty, ...partiesList]);
    setShowAddPartyModal(false);
    const nextNum = parseInt(newPartyForm.code.replace('CUS-', '')) + 1;
    setNewPartyForm({
      code: `CUS-${nextNum.toString().padStart(4, '0')}`,
      name: '',
      type: 'Customer',
      contactPerson: '',
      phone: '',
      alternatePhone: '',
      email: '',
      gstRegistration: 'Unregistered',
      gstin: '',
      state: '24 - Gujarat',
      pan: '',
      legalName: '',
      tradeName: '',
      addressLine1: '',
      addressLine2: '',
      city: 'Surat',
      pincode: '395001',
      openingBalance: 0,
      balanceType: 'Receivable',
      creditLimit: 0,
      paymentTerms: '30 Days',
      isActive: true,
    });
  };

  // 2. Add Product Modal State (Screenshot 3)
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdForm, setNewProdForm] = useState({
    name: '',
    barcode: '',
    unit: 'PCS',
    purchaseRate: 0,
    saleRate: 0,
    mrp: 0,
    hsn: '',
    gstRate: 5,
    defaultDisc: 0,
    includeGst: false,
    openingStock: 0,
    minStockAlert: 0,
    isActive: true,
  });

  // Dynamic calculations for Add Product Tax Card (Screenshot 3)
  const newProdSaleRate = Number(newProdForm.saleRate) || 0;
  const newProdGstRate = Number(newProdForm.gstRate) || 0;
  let newProdTaxable = 0;
  let newProdGstAmount = 0;
  let newProdFinalPrice = 0;

  if (newProdForm.includeGst) {
    newProdFinalPrice = newProdSaleRate;
    newProdTaxable = newProdSaleRate / (1 + newProdGstRate / 100);
    newProdGstAmount = newProdSaleRate - newProdTaxable;
  } else {
    newProdTaxable = newProdSaleRate;
    newProdGstAmount = (newProdTaxable * newProdGstRate) / 100;
    newProdFinalPrice = newProdTaxable + newProdGstAmount;
  }

  const handleSaveNewProduct = () => {
    if (!newProdForm.name.trim()) {
      alert('Please enter Product Name');
      return;
    }
    const createdProd = {
      id: Date.now(),
      name: newProdForm.name.trim(),
      hsn: newProdForm.hsn,
      unit: newProdForm.unit,
      purchaseRate: Number(newProdForm.purchaseRate) || 0,
      saleRate: Number(newProdForm.saleRate) || 0,
      mrp: Number(newProdForm.mrp) || 0,
      gst: `${newProdForm.gstRate}%`,
      stock: Number(newProdForm.openingStock) || 0,
      status: newProdForm.isActive ? 'Active' : 'Inactive',
    };
    setProductsList([createdProd, ...productsList]);
    setShowAddProductModal(false);
    setNewProdForm({
      name: '',
      barcode: '',
      unit: 'PCS',
      purchaseRate: 0,
      saleRate: 0,
      mrp: 0,
      hsn: '',
      gstRate: 5,
      defaultDisc: 0,
      includeGst: false,
      openingStock: 0,
      minStockAlert: 0,
      isActive: true,
    });
  };

  // 3. Quick Command Palette (Ctrl+K) & Indian Festival Calendar (Screenshot 4)
  const [showQuickSearchModal, setShowQuickSearchModal] = useState(false);
  const [quickSearchQuery, setQuickSearchQuery] = useState('');
  const [showFestivalModal, setShowFestivalModal] = useState(false);
  const [selectedFestivalYear, setSelectedFestivalYear] = useState<number>(2026);
  const [festivalCategory, setFestivalCategory] = useState<'All' | 'Major Festivals' | 'Muhurat' | 'Holidays'>('All');

  // Keyboard shortcut listener for Ctrl+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowQuickSearchModal((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setShowQuickSearchModal(false);
        setShowAddPartyModal(false);
        setShowAddProductModal(false);
        setShowFestivalModal(false);
        setShowSalaryPayModal(false);
        setShowAddEmployeeModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 4. EMS / Factory Employee Management State (Screenshot 5)
  const [emsSubTab, setEmsSubTab] = useState<'dashboard' | 'employees' | 'production' | 'advances' | 'leaves' | 'payroll' | 'reports'>('dashboard');
  const [employeesList, setEmployeesList] = useState([
    {
      code: 'EMP-001',
      name: 'Ramesh Patel',
      role: 'Master Operator',
      department: 'Weaving Unit',
      wageType: 'Monthly',
      rate: 18000,
      presentDays: 26,
      totalWorkingDays: 26,
      advanceTaken: 250,
      unpaidCarryForward: 0,
      status: 'Active',
      lastPaidPeriod: 'August 2026',
    },
    {
      code: 'EMP-002',
      name: 'Suresh Kumar',
      role: 'Technician',
      department: 'Maintenance',
      wageType: 'Daily',
      rate: 600,
      presentDays: 24,
      totalWorkingDays: 26,
      advanceTaken: 0,
      unpaidCarryForward: 0,
      status: 'Active',
      lastPaidPeriod: 'August 2026',
    },
  ]);

  // Salary settlement modal
  const [showSalaryPayModal, setShowSalaryPayModal] = useState(false);
  const [selectedEmpForSalary, setSelectedEmpForSalary] = useState<typeof employeesList[0] | null>(null);
  const [salaryCustomDeduction, setSalaryCustomDeduction] = useState(0);
  const [salaryDeductionReason, setSalaryDeductionReason] = useState('Daily absent adjustment');
  const [salaryBonusAmount, setSalaryBonusAmount] = useState(0);
  const [salarySuccessToast, setSalarySuccessToast] = useState<string | null>(null);

  // Add Employee modal
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [newEmpForm, setNewEmpForm] = useState({
    code: 'EMP-003',
    name: '',
    role: 'Operator',
    department: 'Production',
    wageType: 'Monthly' as 'Monthly' | 'Daily',
    rate: 15000,
    phone: '',
  });

  const handleSaveEmployee = () => {
    if (!newEmpForm.name.trim()) {
      alert('Please enter employee name');
      return;
    }
    const createdEmp = {
      code: newEmpForm.code,
      name: newEmpForm.name.trim(),
      role: newEmpForm.role,
      department: newEmpForm.department,
      wageType: newEmpForm.wageType,
      rate: Number(newEmpForm.rate) || 15000,
      presentDays: 26,
      totalWorkingDays: 26,
      advanceTaken: 0,
      unpaidCarryForward: 0,
      status: 'Active',
      lastPaidPeriod: 'August 2026',
    };
    setEmployeesList([...employeesList, createdEmp]);
    setShowAddEmployeeModal(false);
    const nextCode = `EMP-${(employeesList.length + 2).toString().padStart(3, '0')}`;
    setNewEmpForm({
      code: nextCode,
      name: '',
      role: 'Operator',
      department: 'Production',
      wageType: 'Monthly',
      rate: 15000,
      phone: '',
    });
  };

  // Indian Festivals database (2026 to 2040)
  const getFestivalsForYear = (year: number) => {
    // Curated high-precision panchang festivals with Gujarati trading calendar
    const baseFestivals = [
      { name: 'Makar Sankranti / Uttarayan', date: `14-01-${year}`, tithi: 'Magh Krishna Pratipada', category: 'Major Festivals', marketHoliday: true, notes: 'Surat Kite Festival & Textile Market Holiday' },
      { name: 'Republic Day', date: `26-01-${year}`, tithi: 'National Day', category: 'Holidays', marketHoliday: true, notes: 'National Holiday' },
      { name: 'Maha Shivratri', date: year === 2026 ? '15-02-2026' : `18-02-${year}`, tithi: 'Phalguna Krishna Chaturdashi', category: 'Major Festivals', marketHoliday: true, notes: 'Bholenath Mahapuja & Vrat' },
      { name: 'Holi (Holika Dahan)', date: year === 2026 ? '03-03-2026' : `10-03-${year}`, tithi: 'Phalguna Purnima', category: 'Major Festivals', marketHoliday: false, notes: 'Evening Holika Pujan' },
      { name: 'Dhuleti / Rang Panchami', date: year === 2026 ? '04-03-2026' : `11-03-${year}`, tithi: 'Chaitra Krishna Pratipada', category: 'Major Festivals', marketHoliday: true, notes: 'Colors Festival & Full Market Holiday' },
      { name: 'Chaitra Navratri / Gudi Padwa', date: year === 2026 ? '19-03-2026' : `25-03-${year}`, tithi: 'Chaitra Shukla Pratipada', category: 'Muhurat', marketHoliday: false, notes: 'Hindu New Year & Shubh Muhurat' },
      { name: 'Ram Navami', date: year === 2026 ? '27-03-2026' : `02-04-${year}`, tithi: 'Chaitra Shukla Navami', category: 'Major Festivals', marketHoliday: true, notes: 'Shree Ram Janmotsav' },
      { name: 'Mahavir Jayanti', date: year === 2026 ? '31-03-2026' : `06-04-${year}`, tithi: 'Chaitra Shukla Trayodashi', category: 'Holidays', marketHoliday: true, notes: 'Jain Trading Holiday' },
      { name: 'Dr. B.R. Ambedkar Jayanti', date: `14-04-${year}`, tithi: 'National Day', category: 'Holidays', marketHoliday: true, notes: 'Bank & Commercial Holiday' },
      { name: 'Raksha Bandhan', date: year === 2026 ? '28-08-2026' : `18-08-${year}`, tithi: 'Shravana Purnima', category: 'Major Festivals', marketHoliday: true, notes: 'Narali Purnima' },
      { name: 'Krishna Janmashtami', date: year === 2026 ? '04-09-2026' : `26-08-${year}`, tithi: 'Bhadrapada Krishna Ashtami', category: 'Major Festivals', marketHoliday: true, notes: 'Lord Krishna Janmotsav & Dahi Handi' },
      { name: 'Ganesh Chaturthi', date: year === 2026 ? '14-09-2026' : `05-09-${year}`, tithi: 'Bhadrapada Shukla Chaturthi', category: 'Major Festivals', marketHoliday: true, notes: 'Ganeshotsav Sthapana Muhurat' },
      { name: 'Sharad Navratri Sthapana', date: year === 2026 ? '11-10-2026' : `01-10-${year}`, tithi: 'Ashwin Shukla Pratipada', category: 'Major Festivals', marketHoliday: false, notes: '9 Days Garba Festival Starts' },
      { name: 'Vijayadashami / Dussehra', date: year === 2026 ? '20-10-2026' : `11-10-${year}`, tithi: 'Ashwin Shukla Dashami', category: 'Muhurat', marketHoliday: true, notes: 'Shastra & Factory Machinery Puja Shubh Muhurat' },
      { name: 'Dhanteras & Chopda Pujan', date: year === 2026 ? '06-11-2026' : `28-10-${year}`, tithi: 'Kartik Krishna Trayodashi', category: 'Muhurat', marketHoliday: false, notes: 'Gold, Silver & Account Books Buying Muhurat' },
      { name: 'Diwali (Lakshmi Pujan)', date: year === 2026 ? '08-11-2026' : `30-10-${year}`, tithi: 'Kartik Amavasya', category: 'Muhurat', marketHoliday: true, notes: 'Special Evening Diwali Muhurat Trading Session' },
      { name: 'Bestu Varas / Gujarati New Year', date: year === 2026 ? '09-11-2026' : `31-10-${year}`, tithi: 'Kartik Shukla Pratipada', category: 'Major Festivals', marketHoliday: true, notes: 'Vikram Samvat New Year (Salmubarak)' },
      { name: 'Bhai Dooj', date: year === 2026 ? '10-11-2026' : `01-11-${year}`, tithi: 'Kartik Shukla Dwitiya', category: 'Major Festivals', marketHoliday: false, notes: 'Yama Dwitiya' },
      { name: 'Labh Pancham (Surat Market Reopening)', date: year === 2026 ? '14-11-2026' : `05-11-${year}`, tithi: 'Kartik Shukla Panchami', category: 'Muhurat', marketHoliday: false, notes: 'Surat Textile & Diamond Market Official New Year Muhurat' },
      { name: 'Dev Diwali / Kartik Purnima', date: year === 2026 ? '24-11-2026' : `15-11-${year}`, tithi: 'Kartik Purnima', category: 'Major Festivals', marketHoliday: true, notes: 'Tulsi Vivah & Deepotsav' },
    ];
    return baseFestivals;
  };

  // Color theme definitions matching the screenshots
  const bgClass = isNightMode ? 'bg-[#0B0F19]' : 'bg-[#F1F5F9]';
  const cardBgClass = isNightMode ? 'bg-[#131C2E]' : 'bg-white';
  const textPrimary = isNightMode ? 'text-white' : 'text-[#0F172A]';
  const textMuted = isNightMode ? 'text-[#94A3B8]' : 'text-[#64748B]';
  const borderClass = isNightMode ? 'border-[#223249]' : 'border-[#E2E8F0]';
  const headerBgClass = isNightMode ? 'bg-[#131C2E]' : 'bg-white';

  return (
    <div className="w-full my-6 select-none font-sans">
      {/* Outer Windows Container (Exact Window Style with blue glow shadow) */}
      <div className={`w-full rounded-2xl overflow-hidden shadow-2xl border ${borderClass} ${bgClass} transition-colors duration-200`}>
        
        {/* ========================================================================= */}
        {/* TOP WINDOW TITLEBAR (Exact match: Search, Trial badge, FY, JARI TEXTILE) */}
        {/* ========================================================================= */}
        <div className={`flex items-center justify-between px-4 py-2.5 ${headerBgClass} border-b ${borderClass} text-xs`}>
          {/* Left: Hamburger + View Title */}
          <div className="flex items-center gap-3">
            <button className="p-1 rounded text-slate-500 hover:text-slate-800">
              <span className="text-base font-bold">≡</span>
            </button>
            <h1 className={`font-bold text-sm ${textPrimary}`}>
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'sales' && 'Sales'}
              {activeTab === 'sales_return' && 'Sales Return'}
              {activeTab === 'purchase' && 'Purchase'}
              {activeTab === 'purchase_return' && 'Purchase Return'}
              {activeTab === 'products' && 'Products'}
              {activeTab === 'parties' && 'Parties'}
              {activeTab === 'stock' && 'Stock'}
              {activeTab === 'ledger' && 'Ledger'}
              {activeTab === 'reports' && 'Reports'}
              {activeTab === 'ems' && 'EMS / Staff'}
              {activeTab === 'catalog' && 'PDF Catalog'}
              {activeTab === 'settings' && 'Settings'}
            </h1>
          </div>

          {/* Center: Global Search Input with Ctrl+K */}
          <div
            onClick={() => setShowQuickSearchModal(true)}
            className="hidden md:flex items-center relative w-80 cursor-pointer group"
            title="Press Ctrl+K or Click to search"
          >
            <Search className="w-3.5 h-3.5 absolute left-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
            <input
              type="text"
              readOnly
              placeholder="Search anything... (Ctrl+K)"
              className={`w-full pl-9 pr-14 py-1.5 rounded-lg text-xs border ${borderClass} ${isNightMode ? 'bg-[#0B0F19]' : 'bg-slate-50'} ${textPrimary} focus:outline-none cursor-pointer group-hover:border-blue-400 transition-colors`}
            />
            <span className="absolute right-2.5 px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold pointer-events-none group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
              Ctrl+K
            </span>
          </div>

          {/* Right: Trial status, FY, Bell, Lock, Profile, Window Controls */}
          <div className="flex items-center gap-2.5">
            {/* Trial badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Trial — 31 days left</span>
            </div>

            {/* Financial Year */}
            <div className={`px-2 py-1 rounded-lg border ${borderClass} font-medium text-[11px] flex items-center gap-1 ${textPrimary}`}>
              <span>FY 2026-27</span>
              <span className="text-[9px]">▾</span>
            </div>

            {/* Notification bell & Lock */}
            <button className="p-1 rounded text-slate-500 hover:text-slate-800">
              <Bell className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 rounded text-slate-500 hover:text-slate-800">
              <Lock className="w-3.5 h-3.5" />
            </button>

            {/* User Profile matching Screenshot */}
            <div className="flex items-center gap-2 pl-1 border-l border-slate-300 dark:border-slate-700">
              <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-white text-[10px] font-bold">
                JT
              </div>
              <div className="hidden lg:block leading-tight text-left">
                <span className={`block font-bold text-[11px] ${textPrimary}`}>JARI TEXTILE</span>
                <span className="block text-[9px] text-slate-400">dishant</span>
              </div>
            </div>

            {/* Windows Window Controls */}
            <div className="flex items-center gap-2 pl-2 text-slate-400 text-xs">
              <span className="cursor-pointer hover:text-slate-700 font-bold">—</span>
              <span className="cursor-pointer hover:text-slate-700 font-bold">□</span>
              <span className="cursor-pointer hover:text-red-500 font-bold">✕</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN BODY: EXACT LEFT SIDEBAR + EXACT RIGHT CONTENT                     */}
        {/* ========================================================================= */}
        <div className="flex" style={{ minHeight: '660px' }}>
          
          {/* LEFT SIDEBAR (Exact matches: Icons, Labels, Blue Highlights, Bottom Card) */}
          <aside className={`w-52 shrink-0 ${cardBgClass} border-r ${borderClass} p-3 flex flex-col justify-between`}>
            <div className="space-y-4">
              {/* Brand Logo Header */}
              <div className="flex items-center gap-2.5 px-1 py-1">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                  <span className="text-base">📦</span>
                </div>
                <div>
                  <h2 className="text-xs font-black tracking-tight text-blue-600 flex items-center gap-1">
                    SIGNATURES <span className="text-slate-800 dark:text-white">BILL</span>
                  </h2>
                  <p className="text-[9px] text-slate-400 tracking-tight">Simple Business Billing</p>
                </div>
              </div>

              {/* Sidebar Menu Items */}
              <nav className="space-y-0.5 text-xs">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
                  { id: 'sales', label: 'Sales', icon: <FileText className="w-4 h-4" /> },
                  { id: 'sales_return', label: 'Sales Return', icon: <RotateCcw className="w-4 h-4" /> },
                  { id: 'purchase', label: 'Purchase', icon: <ShoppingCart className="w-4 h-4" /> },
                  { id: 'purchase_return', label: 'Purchase Return', icon: <RotateCcw className="w-4 h-4" /> },
                  { id: 'products', label: 'Products', icon: <Package className="w-4 h-4" /> },
                  { id: 'parties', label: 'Parties', icon: <Users className="w-4 h-4" /> },
                  { id: 'stock', label: 'Stock', icon: <Layers className="w-4 h-4" /> },
                  { id: 'ledger', label: 'Ledger', icon: <BookOpen className="w-4 h-4" /> },
                  { id: 'reports', label: 'Reports', icon: <BarChart3 className="w-4 h-4" /> },
                  { id: 'ems', label: 'EMS / Staff', icon: <UserCheck className="w-4 h-4" /> },
                  { id: 'catalog', label: 'PDF Catalog', icon: <BookTemplate className="w-4 h-4" />, badge: 'NEW' },
                  { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
                ].map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as any);
                        if (item.id === 'sales') setSalesMode('list');
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 font-bold dark:bg-blue-950/50 dark:text-blue-400'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-600 text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Profile Status Card matching screenshot */}
            <div className={`p-2.5 rounded-xl border border-dashed ${borderClass} flex items-center gap-2 bg-slate-50/50 dark:bg-slate-900/30`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <div className="leading-tight text-left">
                <span className={`block text-[11px] font-bold ${textPrimary}`}>JARI TEXTILE</span>
                <span className="block text-[9px] text-slate-400">System Online</span>
              </div>
            </div>
          </aside>

          {/* RIGHT WORKSPACE AREA */}
          <main className="flex-1 p-5 overflow-y-auto">

            {/* ===================================================================== */}
            {/* SCREEN 1: DASHBOARD (Matching Screenshot 5)                            */}
            {/* ===================================================================== */}
            {activeTab === 'dashboard' && (
              <div className="space-y-4">
                {/* Greeting & Time Filter Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className={`text-xl font-bold ${textPrimary} flex items-center gap-2`}>
                      Good Evening, dishant! <span>👏</span>
                    </h2>
                    <p className={`text-xs ${textMuted}`}>Here's what's happening in your business today.</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Day / Night pill */}
                    <div className="flex p-0.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs">
                      <button
                        onClick={() => setIsNightMode(false)}
                        className={`px-3 py-1 rounded-lg font-medium transition-all ${!isNightMode ? 'bg-blue-600 text-white font-bold' : 'text-slate-500'}`}
                      >
                        ○ Day
                      </button>
                      <button
                        onClick={() => setIsNightMode(true)}
                        className={`px-3 py-1 rounded-lg font-medium transition-all ${isNightMode ? 'bg-blue-600 text-white font-bold' : 'text-slate-500'}`}
                      >
                        ● Night
                      </button>
                    </div>

                    {/* Time filter: Today, Week, Month, Year */}
                    <div className="flex p-0.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold">
                      {['Today', 'Week', 'Month', 'Year'].map((t, idx) => (
                        <button
                          key={t}
                          className={`px-3 py-1 rounded-lg transition-all ${idx === 0 ? 'bg-blue-600 text-white' : 'text-slate-500'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    {/* Date */}
                    <div className={`px-3 py-1.5 rounded-xl border ${borderClass} ${cardBgClass} text-xs font-semibold ${textMuted} flex items-center gap-1.5`}>
                      <Calendar className="w-3.5 h-3.5 text-blue-500" />
                      <span>23 Sep 2026, Wednesday</span>
                    </div>
                  </div>
                </div>

                {/* 4 Metric Cards (Matching Screenshot 5) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className={`p-4 rounded-2xl ${cardBgClass} border ${borderClass} space-y-2`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs ${textMuted}`}>Today's Sales</span>
                      <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600">
                        <FileText className="w-4 h-4" />
                      </div>
                    </div>
                    <div className={`text-xl font-bold font-mono ${textPrimary}`}>₹4,200.00</div>
                    <span className="text-[10px] text-emerald-500 font-semibold block">↗ -98.7% today • 1 Invoice</span>
                  </div>

                  <div className={`p-4 rounded-2xl ${cardBgClass} border ${borderClass} space-y-2`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs ${textMuted}`}>Today's Purchase</span>
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center text-emerald-600">
                        <ShoppingCart className="w-4 h-4" />
                      </div>
                    </div>
                    <div className={`text-xl font-bold font-mono ${textPrimary}`}>₹0.00</div>
                    <span className={`text-[10px] ${textMuted} block`}>0 Bills today</span>
                  </div>

                  <div className={`p-4 rounded-2xl ${cardBgClass} border ${borderClass} space-y-2`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs ${textMuted}`}>Receivable</span>
                      <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950 flex items-center justify-center text-amber-600">
                        <Users className="w-4 h-4" />
                      </div>
                    </div>
                    <div className={`text-xl font-bold font-mono ${textPrimary}`}>₹6,76,000.00</div>
                    <span className="text-[10px] text-amber-600 font-semibold block">11 Invoices pending</span>
                  </div>

                  <div className={`p-4 rounded-2xl ${cardBgClass} border ${borderClass} space-y-2`}>
                    <div className="flex justify-between items-center">
                      <span className={`text-xs ${textMuted}`}>Payable</span>
                      <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950 flex items-center justify-center text-purple-600">
                        <Layers className="w-4 h-4" />
                      </div>
                    </div>
                    <div className={`text-xl font-bold font-mono ${textPrimary}`}>₹0.00</div>
                    <span className={`text-[10px] ${textMuted} block`}>0 Bills pending</span>
                  </div>
                </div>

                {/* Middle Grid: Recent Sales + Right Festivals & Low Stock */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Recent Sales (5 Most Recent) */}
                  <div className={`lg:col-span-2 p-4 rounded-2xl ${cardBgClass} border ${borderClass} space-y-3`}>
                    <div className="flex items-center justify-between border-b pb-2 border-slate-100 dark:border-slate-800">
                      <h3 className={`text-xs font-bold ${textPrimary}`}>Recent Sales</h3>
                      <span className={`text-[11px] ${textMuted}`}>5 Most Recent</span>
                    </div>

                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className={`text-[10px] font-bold uppercase ${textMuted}`}>
                          <th className="pb-2">INVOICE NO</th>
                          <th className="pb-2">DATE</th>
                          <th className="pb-2">CUSTOMER</th>
                          <th className="pb-2 text-right">AMOUNT</th>
                          <th className="pb-2 text-center">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {salesList.slice(0, 5).map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                            <td className="py-2.5 font-mono text-blue-600 font-bold">{row.no}</td>
                            <td className={`py-2.5 ${textMuted}`}>{row.date}</td>
                            <td className={`py-2.5 font-semibold ${textPrimary}`}>{row.customer}</td>
                            <td className={`py-2.5 text-right font-mono font-bold ${textPrimary}`}>
                              ₹{row.amount.toLocaleString('en-IN')}.00
                            </td>
                            <td className="py-2.5 text-center">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Right Column: Upcoming Festivals & Low Stock Items */}
                  <div className="space-y-3">
                    {/* Festivals Box */}
                    <div className={`p-4 rounded-2xl ${cardBgClass} border ${borderClass} space-y-2.5`}>
                      <div className="flex justify-between items-center text-xs">
                        <span className={`font-bold ${textPrimary} flex items-center gap-1.5`}>
                          <span>📅</span> Upcoming Festivals
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 font-bold">
                          2026–2040
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center gap-2.5">
                        <span className="text-xl">🪔</span>
                        <div className="text-xs">
                          <strong className="block text-slate-800 font-bold">Mahatma Gandhi Jayanti...</strong>
                          <span className="text-[10px] text-slate-500">Friday, 2 Oct 2026</span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-500 pt-1">
                        <span className="block font-medium">Shardiya Navratri / Durga Puja</span>
                        <span className="text-[10px]">Sunday, 11 Oct 2026</span>
                      </div>
                    </div>

                    {/* Low Stock Items Box */}
                    <div className={`p-4 rounded-2xl ${cardBgClass} border ${borderClass} space-y-2`}>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-red-600 flex items-center gap-1.5">
                          <span>⚠️</span> Low Stock Items
                        </span>
                        <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                          Action Needed
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs text-center border border-emerald-200">
                        <span className="font-bold block">✓ All items well stocked</span>
                        <span className="text-[10px] text-emerald-600">No inventory currently below minimum limit.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Weekly Sales Trend Chart & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Weekly Bar Chart */}
                  <div className={`lg:col-span-2 p-4 rounded-2xl ${cardBgClass} border ${borderClass} space-y-3`}>
                    <div className="flex justify-between items-center text-xs">
                      <span className={`font-bold ${textPrimary}`}>Weekly Sales Trend</span>
                      <span className={textMuted}>Last 7 Days</span>
                    </div>

                    <div className="flex items-end justify-between gap-4 h-28 pt-4 px-4">
                      {[
                        { day: 'Thu', val: 15, active: false },
                        { day: 'Fri', val: 20, active: false },
                        { day: 'Sat', val: 18, active: false },
                        { day: 'Sun', val: 35, active: false },
                        { day: 'Mon', val: 25, active: false },
                        { day: 'Tue', val: 80, active: true },
                        { day: 'Wed', val: 22, active: false },
                      ].map((bar, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                          <div
                            className={`w-full rounded-full transition-all ${
                              bar.active ? 'bg-blue-600 shadow-md shadow-blue-500/30' : 'bg-slate-100 dark:bg-slate-800'
                            }`}
                            style={{ height: `${bar.val}%` }}
                          ></div>
                          <span className={`text-[10px] font-semibold ${bar.active ? 'text-blue-600 font-bold' : textMuted}`}>
                            {bar.day}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className={`p-4 rounded-2xl ${cardBgClass} border ${borderClass} space-y-2.5`}>
                    <h3 className={`text-xs font-bold ${textPrimary}`}>Recent Activity</h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0"></span>
                        <div>
                          <p className={`font-medium ${textPrimary}`}>Sale Invoice 26-27/INV/011 created (₹4,200)</p>
                          <span className={`text-[10px] ${textMuted}`}>Just now</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0"></span>
                        <div>
                          <p className={`font-medium ${textPrimary}`}>Sale Invoice 26-27/INV/010 created (₹3,400)</p>
                          <span className={`text-[10px] ${textMuted}`}>22 Sep 2026</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===================================================================== */}
            {/* SCREEN 2: SALES INVOICES (Matching Screenshot 3)                       */}
            {/* ===================================================================== */}
            {activeTab === 'sales' && (
              <div className="space-y-4">
                {salesMode === 'list' ? (
                  <>
                    {/* Header with Title + Bulk Export + New Sale */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h2 className={`text-xl font-bold ${textPrimary}`}>Sales Invoices</h2>
                        <p className={`text-xs ${textMuted}`}>Create, manage and track sales billing invoices</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${borderClass} ${cardBgClass} ${textPrimary} hover:bg-slate-50 flex items-center gap-1.5`}>
                          <Package className="w-3.5 h-3.5" />
                          <span>Bulk Export</span>
                        </button>
                        <button
                          onClick={() => setSalesMode('new_sale')}
                          className="px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 shadow-sm flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ New Sale</span>
                        </button>
                      </div>
                    </div>

                    {/* 4 Summary Cards matching Screenshot 3 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className={`p-3.5 rounded-2xl ${cardBgClass} border ${borderClass} flex items-center gap-3`}>
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <span className={`text-[11px] ${textMuted} block`}>Total Sales</span>
                          <span className={`text-base font-bold font-mono ${textPrimary}`}>₹6,76,000.00</span>
                        </div>
                      </div>

                      <div className={`p-3.5 rounded-2xl ${cardBgClass} border ${borderClass} flex items-center gap-3`}>
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                          <span className="font-bold">↗</span>
                        </div>
                        <div>
                          <span className={`text-[11px] ${textMuted} block`}>Received</span>
                          <span className={`text-base font-bold font-mono ${textPrimary}`}>₹0.00</span>
                        </div>
                      </div>

                      <div className={`p-3.5 rounded-2xl ${cardBgClass} border ${borderClass} flex items-center gap-3`}>
                        <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                          <span className="font-bold">≡</span>
                        </div>
                        <div>
                          <span className={`text-[11px] ${textMuted} block`}>Pending Due</span>
                          <span className="text-base font-bold font-mono text-red-500">₹6,76,000.00</span>
                        </div>
                      </div>

                      <div className={`p-3.5 rounded-2xl ${cardBgClass} border ${borderClass} flex items-center gap-3`}>
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                          <BarChart3 className="w-4 h-4" />
                        </div>
                        <div>
                          <span className={`text-[11px] ${textMuted} block`}>Invoices</span>
                          <span className={`text-base font-bold font-mono ${textPrimary}`}>{salesList.length}</span>
                        </div>
                      </div>
                    </div>

                    {/* Filter Bar with Period & Months pills */}
                    <div className={`p-3 rounded-2xl ${cardBgClass} border ${borderClass} space-y-2 text-xs`}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-[11px] font-bold ${textMuted}`}>Period:</span>
                          {(['all', 'today', 'this_month', 'custom'] as const).map((p) => (
                            <button
                              key={p}
                              onClick={() => setSalesPeriod(p)}
                              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                                salesPeriod === p ? 'bg-blue-600 text-white' : `${bgClass} ${textMuted}`
                              }`}
                            >
                              {p === 'all' && 'All'}
                              {p === 'today' && 'Today'}
                              {p === 'this_month' && 'This Month'}
                              {p === 'custom' && 'Custom'}
                            </button>
                          ))}
                          <span className="ml-2 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 text-[10px] font-mono font-bold">
                            Active FY: 2026-27
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-blue-600 font-medium">Showing: All Records</span>
                          <button className="text-[11px] text-slate-400 hover:text-slate-700 underline">Reset</button>
                        </div>
                      </div>

                      {/* Month pills */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                        <span className={`text-[10px] font-bold uppercase ${textMuted} mr-1`}>Month:</span>
                        {['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'].map((m) => (
                          <button key={m} className={`px-2 py-0.5 rounded hover:bg-slate-100 ${textMuted}`}>
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Table of Invoices (Exact data from Screenshot 3) */}
                    <div className={`rounded-2xl ${cardBgClass} border ${borderClass} overflow-hidden shadow-sm`}>
                      <div className="p-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-2 relative w-72">
                          <Search className="w-3.5 h-3.5 absolute left-2.5 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Search invoices..."
                            className={`w-full pl-8 pr-3 py-1 rounded-lg text-xs border ${borderClass} ${bgClass} ${textPrimary}`}
                          />
                        </div>
                        <button className="p-1 rounded text-slate-400 hover:text-slate-700">
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className={`border-b ${borderClass} text-[10px] font-bold uppercase ${textMuted}`}>
                              <th className="py-2.5 px-3">Invoice No.</th>
                              <th className="py-2.5 px-3">Date</th>
                              <th className="py-2.5 px-3">Customer</th>
                              <th className="py-2.5 px-3">Items</th>
                              <th className="py-2.5 px-3 text-right">Grand Total</th>
                              <th className="py-2.5 px-3 text-center">Status</th>
                              <th className="py-2.5 px-3 text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {salesList.map((row) => (
                              <tr key={row.no} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                <td className="py-2 px-3 font-mono font-bold text-blue-600 cursor-pointer hover:underline">
                                  {row.no}
                                </td>
                                <td className={`py-2 px-3 ${textMuted}`}>{row.date}</td>
                                <td className="py-2 px-3">
                                  <strong className={`block ${textPrimary}`}>{row.customer}</strong>
                                  {row.gstin && <span className="text-[10px] text-slate-400 font-mono">{row.gstin}</span>}
                                </td>
                                <td className={`py-2 px-3 ${textMuted}`}>{row.items}</td>
                                <td className={`py-2 px-3 text-right font-mono font-bold ${textPrimary}`}>
                                  ₹{row.amount.toLocaleString('en-IN')}.00
                                </td>
                                <td className="py-2 px-3 text-center">
                                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-200">
                                    {row.status}
                                  </span>
                                </td>
                                <td className="py-2 px-3 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    <button
                                      onClick={() => {
                                        setPreviewInvoice({
                                          invoiceNo: row.no,
                                          date: row.date,
                                          customer: row.customer,
                                          phone: '9876543210',
                                          gstin: row.gstin || 'Unregistered',
                                          amount: row.amount,
                                          itemsCount: parseInt(row.items) || 1,
                                        });
                                      }}
                                      className={`px-2 py-0.5 rounded text-[11px] border ${borderClass} hover:bg-slate-100 ${textPrimary}`}
                                    >
                                      Open
                                    </button>
                                    <button className={`px-2 py-0.5 rounded text-[11px] border ${borderClass} hover:bg-slate-100 ${textMuted}`}>
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => {
                                        setPreviewInvoice({
                                          invoiceNo: row.no,
                                          date: row.date,
                                          customer: row.customer,
                                          phone: '9876543210',
                                          gstin: row.gstin || 'Unregistered',
                                          amount: row.amount,
                                          itemsCount: 1,
                                        });
                                      }}
                                      className={`px-2 py-0.5 rounded text-[11px] border ${borderClass} hover:bg-slate-100 ${textMuted}`}
                                    >
                                      PDF
                                    </button>
                                    <button className={`px-2 py-0.5 rounded text-[11px] border ${borderClass} hover:bg-slate-100 ${textMuted}`}>
                                      Excel
                                    </button>
                                    <button className="px-2 py-0.5 rounded text-[11px] border border-emerald-300 text-emerald-600 hover:bg-emerald-50 flex items-center gap-0.5 font-semibold">
                                      <span>💬</span> WA
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  /* ========================================================================= */
                  /* NEW SALES INVOICE (Exact match with Desktop Application Screenshots 1 & 4) */
                  /* ========================================================================= */
                  <div className="space-y-4">
                    {/* Top Bar: Title & Header Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSalesMode('list')}
                          className={`p-1.5 rounded-lg border ${borderClass} hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors ${textPrimary}`}
                          title="Back to Sales List"
                        >
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                        <h2 className={`text-base font-extrabold tracking-tight ${textPrimary}`}>
                          New Sales Invoice
                        </h2>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => setSalesMode('list')}
                          className={`px-4 py-1.5 rounded-lg text-xs font-semibold border ${borderClass} ${cardBgClass} ${textPrimary} hover:bg-slate-100 dark:hover:bg-slate-800 transition-all`}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleCreateBill}
                          className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#2563EB] hover:bg-blue-700 text-white shadow-sm transition-all"
                        >
                          Save Invoice
                        </button>
                      </div>
                    </div>

                    {/* Section 1: Customer & Invoice Meta Details Card */}
                    <div className={`p-4 rounded-xl ${cardBgClass} border ${borderClass} shadow-sm space-y-3`}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                        {/* Invoice No. */}
                        <div>
                          <label className={`block text-[11px] font-semibold ${textMuted} mb-1`}>
                            Invoice No.
                          </label>
                          <input
                            type="text"
                            value={saleInvoiceNo}
                            onChange={(e) => setSaleInvoiceNo(e.target.value)}
                            className={`w-full px-3 py-1.5 rounded-lg text-xs font-bold font-mono text-blue-600 border ${borderClass} ${bgClass} focus:outline-none focus:border-blue-500`}
                          />
                        </div>

                        {/* Date (DD-MM-YYYY) */}
                        <div>
                          <label className={`block text-[11px] font-semibold ${textMuted} mb-1`}>
                            Date (DD-MM-YYYY)
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={saleDate}
                              onChange={(e) => setSaleDate(e.target.value)}
                              className={`w-full pl-3 pr-8 py-1.5 rounded-lg text-xs font-semibold border ${borderClass} ${bgClass} ${textPrimary} focus:outline-none focus:border-blue-500`}
                            />
                            <Calendar className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          </div>
                        </div>

                        {/* Select Customer * */}
                        <div>
                          <label className={`block text-[11px] font-semibold ${textMuted} mb-1`}>
                            Select Customer <span className="text-rose-500">*</span>
                          </label>
                          <select
                            value={saleCustomer}
                            onChange={(e) => handleCustomerChange(e.target.value)}
                            className={`w-full px-3 py-1.5 rounded-lg text-xs font-bold border ${borderClass} ${bgClass} ${textPrimary} focus:outline-none focus:border-blue-500`}
                          >
                            {partiesList.filter((p) => p.type === 'Customer').map((c) => (
                              <option key={c.code} value={c.name}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Customer Info Strip (with Collapsed toggle) */}
                      <div className={`p-2.5 rounded-lg border ${borderClass} ${bgClass} flex items-center justify-between text-xs`}>
                        <div className="space-y-0.5">
                          <p className={`font-bold ${textPrimary}`}>{saleCustomer}</p>
                          <p className={`text-[11px] ${textMuted}`}>
                            {customerAddress}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsCustomerCollapsed(!isCustomerCollapsed)}
                          className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>{isCustomerCollapsed ? 'Expand' : 'Collapsed'}</span>
                          {isCustomerCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* Section 2: Barcode & Manual Search Bar */}
                    <div className={`p-3 rounded-xl ${cardBgClass} border ${borderClass} shadow-sm flex flex-col sm:flex-row items-center gap-3`}>
                      {/* Barcode icon */}
                      <div className="hidden sm:flex items-center justify-center text-blue-600">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <rect x="2" y="4" width="2" height="16" rx="0.5" />
                          <rect x="5" y="4" width="1" height="16" />
                          <rect x="7" y="4" width="3" height="16" rx="0.5" />
                          <rect x="12" y="4" width="1" height="16" />
                          <rect x="15" y="4" width="2" height="16" rx="0.5" />
                          <rect x="19" y="4" width="3" height="16" rx="0.5" />
                        </svg>
                      </div>

                      {/* Barcode / Code Search input */}
                      <div className="flex-1 w-full">
                        <input
                          type="text"
                          value={barcodeInput}
                          onChange={(e) => setBarcodeInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              openSelectProductModal();
                            }
                          }}
                          placeholder="Scan barcode or enter code (e.g. 8901234567890)..."
                          className={`w-full px-3.5 py-2 text-xs rounded-lg border-2 border-blue-400 focus:border-blue-600 ${cardBgClass} ${textPrimary} outline-none shadow-xs`}
                        />
                      </div>

                      {/* Scan Barcode button */}
                      <button
                        onClick={openSelectProductModal}
                        className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-bold bg-[#2563EB] hover:bg-blue-700 text-white shadow-sm flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors"
                      >
                        <span>Scan Barcode</span>
                      </button>

                      {/* Manual Search button */}
                      <button
                        onClick={openSelectProductModal}
                        className={`w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-bold border ${borderClass} ${cardBgClass} ${textPrimary} hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors`}
                      >
                        <Plus className="w-3.5 h-3.5 text-blue-600" />
                        <span>Manual Search</span>
                      </button>
                    </div>

                    {/* Section 3: Products Line Items Table */}
                    <div className={`rounded-xl ${cardBgClass} border ${borderClass} shadow-sm overflow-hidden`}>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className={`border-b ${borderClass} bg-slate-50 dark:bg-slate-800/50 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300`}>
                              <th className="py-2.5 px-4">Product</th>
                              <th className="py-2.5 px-3">HSN</th>
                              <th className="py-2.5 px-3 text-center">Qty</th>
                              <th className="py-2.5 px-3 text-right">Rate</th>
                              <th className="py-2.5 px-3 text-center">Discount</th>
                              <th className="py-2.5 px-3 text-center">GST %</th>
                              <th className="py-2.5 px-3 text-right">Taxable</th>
                              <th className="py-2.5 px-3 text-right">Amount</th>
                              <th className="py-2.5 px-4 text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {newSaleItems.length === 0 ? (
                              <tr>
                                <td colSpan={9} className="py-20 text-center">
                                  <div className="flex flex-col items-center justify-center space-y-1">
                                    <p className={`font-bold text-sm ${textPrimary}`}>No items added to invoice</p>
                                    <p className={`text-xs ${textMuted}`}>Search and select a product above to add items.</p>
                                  </div>
                                </td>
                              </tr>
                            ) : (
                              newSaleItems.map((item) => (
                                <tr
                                  key={item.id}
                                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                                >
                                  {/* Product Name & Unit */}
                                  <td className="py-2.5 px-4">
                                    <p className={`font-bold ${textPrimary}`}>{item.name}</p>
                                    <p className={`text-[10px] ${textMuted}`}>Unit: {item.unit}</p>
                                  </td>
                                  {/* HSN */}
                                  <td className={`py-2.5 px-3 ${textMuted}`}>{item.hsn || '—'}</td>
                                  {/* Qty */}
                                  <td className={`py-2.5 px-3 text-center font-bold ${textPrimary}`}>{item.qty}</td>
                                  {/* Rate */}
                                  <td className={`py-2.5 px-3 text-right font-mono font-semibold ${textPrimary}`}>
                                    ₹{item.rate.toFixed(2)}
                                  </td>
                                  {/* Discount */}
                                  <td className="py-2.5 px-3 text-center font-mono font-semibold text-rose-500">
                                    {item.discountPercent}%
                                  </td>
                                  {/* GST % */}
                                  <td className="py-2.5 px-3 text-center font-mono font-bold text-blue-600">
                                    {item.gstPercent}%
                                  </td>
                                  {/* Taxable */}
                                  <td className={`py-2.5 px-3 text-right font-mono font-semibold ${textPrimary}`}>
                                    ₹{item.taxable.toFixed(2)}
                                  </td>
                                  {/* Amount */}
                                  <td className={`py-2.5 px-3 text-right font-mono font-bold ${textPrimary}`}>
                                    ₹{item.amount.toFixed(2)}
                                  </td>
                                  {/* Actions: Edit & Remove */}
                                  <td className="py-2.5 px-4 text-center">
                                    <div className="flex items-center justify-center gap-1.5">
                                      <button
                                        onClick={() => handleEditItem(item)}
                                        className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border ${borderClass} ${textMuted} hover:text-blue-600 hover:border-blue-400 transition-colors`}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => handleRemoveItem(item.id)}
                                        className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border ${borderClass} ${textMuted} hover:text-rose-600 hover:border-rose-400 transition-colors`}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Badges: Total Products & Total Quantity */}
                    <div className="flex items-center gap-2.5">
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                        Total Products: {newSaleItems.length}
                      </span>
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800">
                        Total Quantity: {totalQuantity} units
                      </span>
                    </div>

                    {/* Section 4: Bottom 2 Columns (Payment & Notes vs Invoice Summary) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                      {/* Left Box: Payment Received & Notes */}
                      <div className={`p-4 rounded-xl ${cardBgClass} border ${borderClass} shadow-sm space-y-3`}>
                        <h4 className={`text-xs font-bold uppercase tracking-wider ${textPrimary}`}>
                          Payment Received & Notes
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Payment Status Dropdown */}
                          <div>
                            <label className={`block text-[11px] font-semibold ${textMuted} mb-1`}>
                              Payment Status
                            </label>
                            <select
                              value={paymentStatus}
                              onChange={(e) => {
                                const st = e.target.value as 'Unpaid' | 'Paid' | 'Partially Paid';
                                setPaymentStatus(st);
                                if (st === 'Paid') setAmountReceived(grandTotal);
                                if (st === 'Unpaid') setAmountReceived(0);
                              }}
                              className={`w-full px-3 py-1.5 rounded-lg text-xs font-bold border ${borderClass} ${bgClass} ${textPrimary} focus:outline-none focus:border-blue-500`}
                            >
                              <option value="Unpaid">Unpaid</option>
                              <option value="Paid">Paid</option>
                              <option value="Partially Paid">Partially Paid</option>
                            </select>
                          </div>

                          {/* Amount Received */}
                          <div>
                            <label className={`block text-[11px] font-semibold ${textMuted} mb-1`}>
                              Amount Received (₹)
                            </label>
                            <input
                              type="number"
                              value={amountReceived}
                              onChange={(e) => setAmountReceived(parseFloat(e.target.value) || 0)}
                              className={`w-full px-3 py-1.5 rounded-lg text-xs font-mono font-bold border ${borderClass} ${bgClass} ${textPrimary} focus:outline-none focus:border-blue-500`}
                            />
                          </div>
                        </div>

                        {/* Invoice Notes / Terms (Optional) */}
                        <div>
                          <label className={`block text-[11px] font-semibold ${textMuted} mb-1`}>
                            Invoice Notes / Terms (Optional)
                          </label>
                          <input
                            type="text"
                            value={invoiceNotes}
                            onChange={(e) => setInvoiceNotes(e.target.value)}
                            placeholder="Add notes or terms for the customer..."
                            className={`w-full px-3 py-2 rounded-lg text-xs border ${borderClass} ${bgClass} ${textPrimary} focus:outline-none focus:border-blue-500`}
                          />
                        </div>
                      </div>

                      {/* Right Box: Invoice Summary */}
                      <div className={`p-4 rounded-xl ${cardBgClass} border ${borderClass} shadow-sm space-y-2.5`}>
                        <h4 className={`text-xs font-bold uppercase tracking-wider ${textPrimary}`}>
                          Invoice Summary
                        </h4>

                        <div className="space-y-1.5 text-xs">
                          {/* Subtotal (Before Disc/Tax) */}
                          <div className="flex justify-between items-center">
                            <span className={textMuted}>Subtotal (Before Disc/Tax)</span>
                            <span className={`font-mono font-bold ${textPrimary}`}>
                              ₹{subtotalBeforeDiscTax.toFixed(2)}
                            </span>
                          </div>

                          {/* Total Discount */}
                          <div className="flex justify-between items-center">
                            <span className={textMuted}>Total Discount</span>
                            <span className="font-mono font-bold text-rose-500">
                              -₹{totalDiscount.toFixed(2)}
                            </span>
                          </div>

                          {/* Taxable Amount */}
                          <div className="flex justify-between items-center">
                            <span className={textMuted}>Taxable Amount</span>
                            <span className={`font-mono font-bold ${textPrimary}`}>
                              ₹{taxableAmount.toFixed(2)}
                            </span>
                          </div>

                          <div className={`border-t ${borderClass} my-1`} />

                          {/* CGST */}
                          <div className="flex justify-between items-center">
                            <span className={textMuted}>CGST</span>
                            <span className="font-mono font-bold text-blue-600">
                              ₹{totalCgst.toFixed(2)}
                            </span>
                          </div>

                          {/* SGST */}
                          <div className="flex justify-between items-center">
                            <span className={textMuted}>SGST</span>
                            <span className="font-mono font-bold text-blue-600">
                              ₹{totalSgst.toFixed(2)}
                            </span>
                          </div>

                          {/* Round Off */}
                          <div className="flex justify-between items-center">
                            <span className={textMuted}>Round Off</span>
                            <span className={`font-mono font-semibold ${textMuted}`}>
                              ₹{roundOff >= 0 ? roundOff.toFixed(2) : `(${Math.abs(roundOff).toFixed(2)})`}
                            </span>
                          </div>

                          {/* Grand Total Highlight Banner */}
                          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex items-center justify-between my-2">
                            <span className="font-extrabold text-xs uppercase tracking-wider text-blue-800 dark:text-blue-300">
                              GRAND TOTAL
                            </span>
                            <span className="font-mono font-black text-xl text-blue-600 dark:text-blue-400">
                              ₹{grandTotal.toFixed(2)}
                            </span>
                          </div>

                          {/* Balance Due */}
                          <div className="flex justify-between items-center pt-1">
                            <span className={`font-bold ${textPrimary}`}>Balance Due</span>
                            <span className="font-mono font-black text-base text-rose-600">
                              ₹{balanceDue.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Save Sales Invoice Button */}
                        <button
                          onClick={handleCreateBill}
                          className="w-full mt-3 py-2.5 rounded-xl text-xs font-bold bg-[#2563EB] hover:bg-blue-700 text-white shadow-md transition-all flex items-center justify-center gap-2"
                        >
                          <span>Save Sales Invoice</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ===================================================================== */}
            {/* SCREEN 3: PRODUCTS MASTER (Matching Screenshot 1)                      */}
            {/* ===================================================================== */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={`text-xl font-bold ${textPrimary}`}>Products Master</h2>
                    <p className={`text-xs ${textMuted}`}>Manage item codes, pricing, GST rates, and stock values</p>
                  </div>
                  <button
                    onClick={() => setShowAddProductModal(true)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 shadow flex items-center gap-1.5 transition-transform active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Product</span>
                  </button>
                </div>

                {/* 3 Metric Cards matching Screenshot 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className={`p-3.5 rounded-2xl ${cardBgClass} border ${borderClass} flex items-center gap-3`}>
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <span className={`text-xs ${textMuted} block`}>Total Products</span>
                      <span className={`text-lg font-bold font-mono ${textPrimary}`}>{productsList.length}</span>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-2xl ${cardBgClass} border ${borderClass} flex items-center gap-3`}>
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <span className="font-bold">↗</span>
                    </div>
                    <div>
                      <span className={`text-xs ${textMuted} block`}>Active Products</span>
                      <span className="text-lg font-bold font-mono text-emerald-600">2</span>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-2xl ${cardBgClass} border ${borderClass} flex items-center gap-3`}>
                    <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                      <span className="font-bold">⚠️</span>
                    </div>
                    <div>
                      <span className={`text-xs ${textMuted} block`}>Low Stock Items</span>
                      <span className="text-lg font-bold font-mono text-red-500">0</span>
                    </div>
                  </div>
                </div>

                {/* Search & Filter Bar */}
                <div className={`p-3 rounded-2xl ${cardBgClass} border ${borderClass} flex flex-wrap items-center justify-between gap-3`}>
                  <div className="relative w-80">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search product..."
                      className={`w-full pl-9 pr-3 py-1.5 rounded-lg text-xs border ${borderClass} ${bgClass} ${textPrimary}`}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex p-0.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                      {(['all', 'active', 'inactive'] as const).map((f) => (
                        <button
                          key={f}
                          onClick={() => setProductFilter(f)}
                          className={`px-3 py-1 rounded-lg capitalize transition-all ${
                            productFilter === f ? 'bg-blue-600 text-white font-bold' : textMuted
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                    <button className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800">
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Products Table matching Screenshot 1 */}
                <div className={`rounded-2xl ${cardBgClass} border ${borderClass} overflow-hidden shadow-sm`}>
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className={`border-b ${borderClass} text-[10px] font-bold uppercase ${textMuted}`}>
                        <th className="py-2.5 px-3">Product</th>
                        <th className="py-2.5 px-3">HSN</th>
                        <th className="py-2.5 px-3">Unit</th>
                        <th className="py-2.5 px-3">Purchase Rate</th>
                        <th className="py-2.5 px-3">Sale Rate</th>
                        <th className="py-2.5 px-3">MRP</th>
                        <th className="py-2.5 px-3">GST</th>
                        <th className="py-2.5 px-3">Stock</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {productsList.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                          <td className={`py-3 px-3 font-bold ${textPrimary}`}>{p.name}</td>
                          <td className={`py-3 px-3 ${textMuted}`}>-</td>
                          <td className={`py-3 px-3 ${textMuted}`}>{p.unit}</td>
                          <td className={`py-3 px-3 font-mono ${textMuted}`}>₹{p.purchaseRate.toFixed(2)}</td>
                          <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                            ₹{p.saleRate.toFixed(2)} <span className="text-[10px] text-slate-400 font-normal">Tax Incl.</span>
                          </td>
                          <td className={`py-3 px-3 font-mono ${textMuted}`}>₹{p.mrp.toFixed(2)}</td>
                          <td className="py-3 px-3 text-blue-600 font-bold">{p.gst}</td>
                          <td className={`py-3 px-3 font-bold font-mono ${p.stock < 0 ? 'text-slate-700' : 'text-slate-900'}`}>
                            {p.stock}
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {p.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button className={`px-2 py-0.5 rounded text-[11px] border ${borderClass} hover:bg-slate-100`}>Edit</button>
                              <button className={`px-2 py-0.5 rounded text-[11px] border ${borderClass} hover:bg-slate-100`}>Active</button>
                              <button className="px-2 py-0.5 rounded text-[11px] text-red-500 border border-red-200 hover:bg-red-50">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ===================================================================== */}
            {/* SCREEN 4: STOCK (Matching Screenshot 2)                                */}
            {/* ===================================================================== */}
            {activeTab === 'stock' && (
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={`text-xl font-bold ${textPrimary}`}>Stock</h2>
                    <p className={`text-xs ${textMuted}`}>Manage your current inventory</p>
                  </div>
                  <button className="px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 shadow flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh</span>
                  </button>
                </div>

                {/* 3 Metric Cards matching Screenshot 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className={`p-4 rounded-2xl ${cardBgClass} border ${borderClass} flex items-center justify-between`}>
                    <div>
                      <span className={`text-xs ${textMuted} block`}>Total Products</span>
                      <span className={`text-xl font-bold font-mono ${textPrimary}`}>2</span>
                      <span className={`text-[10px] ${textMuted} block`}>Active tracked items</span>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Package className="w-5 h-5" />
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl ${cardBgClass} border ${borderClass} flex items-center justify-between`}>
                    <div>
                      <span className={`text-xs ${textMuted} block`}>Stock Value</span>
                      <span className={`text-xl font-bold font-mono ${textPrimary}`}>₹0.00</span>
                      <span className={`text-[10px] ${textMuted} block`}>Based on Purchase Rate</span>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl ${cardBgClass} border ${borderClass} flex items-center justify-between`}>
                    <div>
                      <span className={`text-xs ${textMuted} block`}>Low Stock</span>
                      <span className="text-xl font-bold font-mono text-red-500">0</span>
                      <span className={`text-[10px] ${textMuted} block`}>At or below minimum threshold</span>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <span className="font-bold text-amber-600">⚠️</span>
                    </div>
                  </div>
                </div>

                {/* Filters matching Screenshot 2 */}
                <div className={`p-3 rounded-2xl ${cardBgClass} border ${borderClass} flex flex-wrap items-center justify-between gap-3`}>
                  <div className="relative w-80">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search stock..."
                      className={`w-full pl-9 pr-3 py-1.5 rounded-lg text-xs border ${borderClass} ${bgClass} ${textPrimary}`}
                    />
                  </div>

                  <div className="flex p-0.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
                    {[
                      { id: 'all', label: 'All' },
                      { id: 'in_stock', label: 'In Stock' },
                      { id: 'low_stock', label: 'Low Stock' },
                      { id: 'out_of_stock', label: 'Out of Stock' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setStockFilter(f.id as any)}
                        className={`px-3 py-1 rounded-lg transition-all ${
                          stockFilter === f.id ? 'bg-blue-600 text-white font-bold' : textMuted
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stock Table matching Screenshot 2 */}
                <div className={`rounded-2xl ${cardBgClass} border ${borderClass} overflow-hidden shadow-sm`}>
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className={`border-b ${borderClass} text-[10px] font-bold uppercase ${textMuted}`}>
                        <th className="py-2.5 px-3">PRODUCT</th>
                        <th className="py-2.5 px-3">UNIT</th>
                        <th className="py-2.5 px-3">STOCK</th>
                        <th className="py-2.5 px-3">PURCHASE RATE</th>
                        <th className="py-2.5 px-3">SALE RATE</th>
                        <th className="py-2.5 px-3">VALUE</th>
                        <th className="py-2.5 px-3">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                        <td className={`py-3 px-3 font-bold ${textPrimary}`}>9 tar</td>
                        <td className={`py-3 px-3 ${textMuted}`}>KG</td>
                        <td className="py-3 px-3 font-bold font-mono text-slate-800 dark:text-white">-659 KG</td>
                        <td className={`py-3 px-3 font-mono ${textMuted}`}>₹0.00</td>
                        <td className={`py-3 px-3 font-mono font-bold ${textPrimary}`}>₹400.00</td>
                        <td className={`py-3 px-3 font-mono ${textMuted}`}>₹0.00</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600 border border-red-200">
                            ● Out of Stock
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                        <td className={`py-3 px-3 font-bold ${textPrimary}`}>l9b</td>
                        <td className={`py-3 px-3 ${textMuted}`}>PCS</td>
                        <td className="py-3 px-3 font-bold font-mono text-slate-800 dark:text-white">943 PCS</td>
                        <td className={`py-3 px-3 font-mono ${textMuted}`}>₹0.00</td>
                        <td className={`py-3 px-3 font-mono font-bold ${textPrimary}`}>₹200.00</td>
                        <td className={`py-3 px-3 font-mono ${textMuted}`}>₹0.00</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                            ● In Stock
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ===================================================================== */}
            {/* SCREEN 5: PARTIES & RATES (Matching Screenshot 4)                      */}
            {/* ===================================================================== */}
            {activeTab === 'parties' && (
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className={`text-xl font-bold ${textPrimary} flex items-center gap-2`}>
                      Parties & Rates <span className="text-xs text-blue-600 font-semibold cursor-pointer">○ Party Rates Off</span>
                    </h2>
                    <p className={`text-xs ${textMuted}`}>Manage customer accounts, supplier ledgers and party-wise product rate sessions</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${borderClass} ${cardBgClass} ${textPrimary} flex items-center gap-1`}>
                      <Users className="w-3.5 h-3.5 text-blue-600" />
                      <span>All Parties</span>
                    </button>
                    <button className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${borderClass} ${cardBgClass} ${textPrimary} flex items-center gap-1`}>
                      <span>🏷️</span>
                      <span>Party Rates</span>
                    </button>
                    <button
                      onClick={() => setShowAddPartyModal(true)}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 shadow flex items-center gap-1 transition-transform active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Party</span>
                    </button>
                  </div>
                </div>

                {/* 4 Cards matching Screenshot 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className={`p-3.5 rounded-2xl ${cardBgClass} border ${borderClass} flex items-center gap-3`}>
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`text-xs ${textMuted} block`}>Total Parties</span>
                      <span className={`text-lg font-bold font-mono ${textPrimary}`}>4</span>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-2xl ${cardBgClass} border ${borderClass} flex items-center gap-3`}>
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`text-xs ${textMuted} block`}>Customers</span>
                      <span className={`text-lg font-bold font-mono ${textPrimary}`}>3</span>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-2xl ${cardBgClass} border ${borderClass} flex items-center gap-3`}>
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`text-xs ${textMuted} block`}>Suppliers</span>
                      <span className={`text-lg font-bold font-mono ${textPrimary}`}>1</span>
                    </div>
                  </div>

                  <div className={`p-3.5 rounded-2xl ${cardBgClass} border ${borderClass} flex items-center gap-3`}>
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <span className="font-bold text-blue-600">₹</span>
                    </div>
                    <div>
                      <span className={`text-xs ${textMuted} block`}>Receivables</span>
                      <span className={`text-lg font-bold font-mono ${textPrimary}`}>₹0.00</span>
                    </div>
                  </div>
                </div>

                {/* Filter */}
                <div className={`p-3 rounded-2xl ${cardBgClass} border ${borderClass} flex items-center justify-between`}>
                  <div className="relative w-80">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search party..."
                      className={`w-full pl-9 pr-3 py-1.5 rounded-lg text-xs border ${borderClass} ${bgClass} ${textPrimary}`}
                    />
                  </div>

                  <div className="flex p-0.5 rounded-xl border border-slate-200 text-xs">
                    {(['all', 'customers', 'suppliers', 'both'] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setPartiesFilter(f)}
                        className={`px-3 py-1 rounded-lg capitalize transition-all ${
                          partiesFilter === f ? 'bg-blue-600 text-white font-bold' : textMuted
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table matching Screenshot 4 */}
                <div className={`rounded-2xl ${cardBgClass} border ${borderClass} overflow-hidden shadow-sm`}>
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className={`border-b ${borderClass} text-[10px] font-bold uppercase ${textMuted}`}>
                        <th className="py-2.5 px-3">Party</th>
                        <th className="py-2.5 px-3">Type</th>
                        <th className="py-2.5 px-3">Mobile / Contact</th>
                        <th className="py-2.5 px-3">GSTIN</th>
                        <th className="py-2.5 px-3">Balance</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {partiesList.map((row) => (
                        <tr key={row.code} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                          <td className="py-2.5 px-3">
                            <strong className={`block ${textPrimary}`}>{row.name}</strong>
                            <span className="text-[10px] text-slate-400 font-mono">{row.code}</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                row.type === 'Customer'
                                  ? 'bg-blue-50 text-blue-600'
                                  : 'bg-emerald-50 text-emerald-600'
                              }`}
                            >
                              {row.type}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className={`block font-semibold ${textPrimary}`}>{row.phone}</span>
                            {row.city && <span className="text-[10px] text-slate-400">{row.city}</span>}
                          </td>
                          <td className={`py-2.5 px-3 font-mono ${textMuted}`}>{row.gstin}</td>
                          <td className="py-2.5 px-3 font-mono">
                            <strong className={`block ${textPrimary}`}>₹0.00</strong>
                            <span className="text-[10px] text-slate-400">Receivable</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {row.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button className={`px-2 py-0.5 rounded text-[11px] border ${borderClass} hover:bg-slate-100`}>Edit</button>
                              <button className="px-2 py-0.5 rounded text-[11px] text-red-500 border border-red-200 hover:bg-red-50">Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ===================================================================== */}
            {/* OTHER TABS: STAFF EMS / REPORTS                                       */}
            {/* ===================================================================== */}
            {/* SCREEN 5: EMS & PAYROLL / FACTORY EMPLOYEE MANAGEMENT (Screenshot 5)   */}
            {/* ===================================================================== */}
            {activeTab === 'ems' && (
              <div className="space-y-4">
                {/* Header matching Screenshot 5 */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className={`text-xl font-bold ${textPrimary} flex items-center gap-2`}>
                        EMS & Payroll
                      </h2>
                      <p className={`text-xs ${textMuted}`}>Factory Employee Management</p>
                    </div>
                  </div>

                  {/* Sub-tab Navigation matching Screenshot 5 */}
                  <div className="flex items-center gap-1 overflow-x-auto py-1">
                    {[
                      { id: 'dashboard', label: 'Dashboard', icon: Zap },
                      { id: 'employees', label: 'Employees', icon: Users },
                      { id: 'production', label: 'Daily Production', icon: Package },
                      { id: 'advances', label: 'Advances', icon: DollarSign },
                      { id: 'leaves', label: 'Leaves', icon: CalendarDays },
                      { id: 'payroll', label: 'Payroll', icon: FileSpreadsheet },
                      { id: 'reports', label: 'Reports', icon: BarChart3 },
                    ].map((tab) => {
                      const IconComponent = tab.icon;
                      const isActive = emsSubTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setEmsSubTab(tab.id as any)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                            isActive
                              ? 'bg-blue-600 text-white shadow-sm'
                              : `${cardBgClass} text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border ${borderClass}`
                          }`}
                        >
                          <IconComponent className="w-3.5 h-3.5" />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Toast Notification if salary paid */}
                {salarySuccessToast && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between animate-fade-in">
                    <div className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{salarySuccessToast}</span>
                    </div>
                    <button onClick={() => setSalarySuccessToast(null)} className="text-emerald-600 hover:text-emerald-900 font-bold text-sm">
                      ×
                    </button>
                  </div>
                )}

                {/* Dashboard Card matching Screenshot 5 */}
                <div className={`p-4 rounded-2xl ${cardBgClass} border ${borderClass} flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm`}>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    <h3 className={`text-base font-bold ${textPrimary}`}>EMS & Factory Dashboard</h3>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Current Salary Period: 01-09-2026 to 30-09-2026</span>
                  </div>
                </div>

                {/* 4 Metric Cards matching Screenshot 5 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Card 1: Total Employees */}
                  <div className={`p-4 rounded-2xl ${cardBgClass} border ${borderClass} shadow-sm`}>
                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-semibold">Total Employees</span>
                    </div>
                    <div className={`text-2xl font-bold font-mono ${textPrimary}`}>
                      {employeesList.length}
                    </div>
                    <div className="text-[11px] font-semibold text-emerald-600 mt-1">
                      {employeesList.filter(e => e.status === 'Active').length} Active Staff
                    </div>
                  </div>

                  {/* Card 2: Today's Production */}
                  <div className={`p-4 rounded-2xl ${cardBgClass} border ${borderClass} shadow-sm`}>
                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                      <Package className="w-4 h-4 text-slate-600" />
                      <span className="text-xs font-semibold">Today's Production</span>
                    </div>
                    <div className={`text-2xl font-bold font-mono ${textPrimary}`}>
                      0.00 KG
                    </div>
                    <div className="text-[11px] font-semibold text-slate-400 mt-1">
                      + 0.00 Hours Logged
                    </div>
                  </div>

                  {/* Card 3: Pending Advances */}
                  <div className={`p-4 rounded-2xl ${cardBgClass} border ${borderClass} shadow-sm`}>
                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                      <DollarSign className="w-4 h-4 text-red-500" />
                      <span className="text-xs font-semibold">Pending Advances</span>
                    </div>
                    <div className="text-2xl font-bold font-mono text-red-600">
                      ₹ {employeesList.reduce((acc, it) => acc + it.advanceTaken, 0).toFixed(2)}
                    </div>
                    <div className="text-[11px] font-semibold text-amber-600 mt-1">
                      {employeesList.filter(e => e.advanceTaken > 0).length} Unsettled Records
                    </div>
                  </div>

                  {/* Card 4: Period Disbursed */}
                  <div className={`p-4 rounded-2xl ${cardBgClass} border ${borderClass} shadow-sm`}>
                    <div className="flex items-center gap-2 text-slate-500 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-semibold">Period Disbursed</span>
                    </div>
                    <div className="text-2xl font-bold font-mono text-purple-600">
                      ₹ 0.00
                    </div>
                    <div className="text-[11px] font-semibold text-slate-400 mt-1">
                      0 Employees Settled
                    </div>
                  </div>
                </div>

                {/* Quick Workflow Actions matching Screenshot 5 */}
                <div className={`p-4 rounded-2xl ${cardBgClass} border ${borderClass} space-y-3 shadow-sm`}>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${textPrimary}`}>
                      Quick Workflow Actions
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setShowAddEmployeeModal(true)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 shadow flex items-center gap-1.5 transition-transform active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add New Employee</span>
                    </button>
                    <button
                      onClick={() => alert('Daily Work & Production Entry modal ready in software')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border ${borderClass} ${bgClass} ${textPrimary} hover:border-blue-400 flex items-center gap-1.5`}
                    >
                      <Package className="w-3.5 h-3.5 text-slate-500" />
                      <span>Daily Work & Production Entry</span>
                    </button>
                    <button
                      onClick={() => {
                        const amt = prompt('Enter advance amount (₹) to issue to Ramesh Patel:', '500');
                        if (amt) {
                          setEmployeesList(employeesList.map(e => e.code === 'EMP-001' ? { ...e, advanceTaken: e.advanceTaken + (parseFloat(amt) || 0) } : e));
                          setSalarySuccessToast(`Cash advance of ₹${amt} successfully recorded for Ramesh Patel.`);
                        }
                      }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border ${borderClass} ${bgClass} ${textPrimary} hover:border-blue-400 flex items-center gap-1.5`}
                    >
                      <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Issue Cash Advance</span>
                    </button>
                    <button
                      onClick={() => alert('Leave & Absence attendance register ready')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border ${borderClass} ${bgClass} ${textPrimary} hover:border-blue-400 flex items-center gap-1.5`}
                    >
                      <CalendarDays className="w-3.5 h-3.5 text-amber-600" />
                      <span>Record Leave / Absence</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedEmpForSalary(employeesList[0]);
                        setSalaryCustomDeduction(0);
                        setSalaryBonusAmount(0);
                        setShowSalaryPayModal(true);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 shadow flex items-center gap-1.5 transition-transform active:scale-95"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>Compute & Pay Salary</span>
                    </button>
                    <button
                      onClick={() => alert('Viewing Monthly EMS Register & PF / ESIC Statements')}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold border ${borderClass} ${bgClass} ${textPrimary} hover:border-blue-400 flex items-center gap-1.5`}
                    >
                      <BarChart3 className="w-3.5 h-3.5 text-purple-600" />
                      <span>View Reports & Statements</span>
                    </button>
                  </div>
                </div>

                {/* Staff Roster & Salary Cycle Table */}
                <div className={`rounded-2xl ${cardBgClass} border ${borderClass} overflow-hidden shadow-sm`}>
                  <div className={`p-4 border-b ${borderClass} flex items-center justify-between`}>
                    <div>
                      <h4 className={`text-sm font-bold ${textPrimary}`}>Factory Staff Roster & Salary Settlements</h4>
                      <p className={`text-[11px] ${textMuted}`}>Automated monthly attendance calculation with custom absent deduction & advance adjustments</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      Next Salary Due: 28-09-2026
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className={`border-b ${borderClass} ${isNightMode ? 'bg-[#182338]' : 'bg-slate-50'} ${textMuted}`}>
                        <tr>
                          <th className="py-2.5 px-4 font-semibold">Emp Code</th>
                          <th className="py-2.5 px-4 font-semibold">Name & Role</th>
                          <th className="py-2.5 px-4 font-semibold">Wage Basis</th>
                          <th className="py-2.5 px-4 font-semibold">Standard Rate</th>
                          <th className="py-2.5 px-4 font-semibold">Present Days</th>
                          <th className="py-2.5 px-4 font-semibold">Advance Taken</th>
                          <th className="py-2.5 px-4 font-semibold">Estimated Net Pay</th>
                          <th className="py-2.5 px-4 font-semibold">Status</th>
                          <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {employeesList.map((emp) => {
                          const basePay = emp.wageType === 'Monthly' ? emp.rate : emp.rate * emp.presentDays;
                          const netEst = Math.max(0, basePay - emp.advanceTaken);
                          return (
                            <tr key={emp.code} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                              <td className="py-3 px-4 font-mono font-bold text-blue-600">{emp.code}</td>
                              <td className="py-3 px-4">
                                <div className={`font-bold ${textPrimary}`}>{emp.name}</div>
                                <div className={`text-[11px] ${textMuted}`}>{emp.role} • {emp.department}</div>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  emp.wageType === 'Monthly' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                                }`}>
                                  {emp.wageType}
                                </span>
                              </td>
                              <td className={`py-3 px-4 font-mono font-semibold ${textPrimary}`}>
                                ₹{emp.rate.toLocaleString('en-IN')}{emp.wageType === 'Daily' ? ' / day' : ' / mo'}
                              </td>
                              <td className="py-3 px-4">
                                <span className="font-bold text-slate-800 dark:text-slate-200">{emp.presentDays}</span>
                                <span className={`text-[11px] ${textMuted}`}> / {emp.totalWorkingDays} Days</span>
                              </td>
                              <td className="py-3 px-4 font-mono font-bold text-red-600">
                                {emp.advanceTaken > 0 ? `₹${emp.advanceTaken.toFixed(2)}` : '₹0.00'}
                              </td>
                              <td className="py-3 px-4 font-mono font-bold text-emerald-600">
                                ₹{netEst.toLocaleString('en-IN')}.00
                              </td>
                              <td className="py-3 px-4">
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  {emp.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => {
                                    setSelectedEmpForSalary(emp);
                                    setSalaryCustomDeduction(0);
                                    setSalaryBonusAmount(0);
                                    setShowSalaryPayModal(true);
                                  }}
                                  className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-transform active:scale-95"
                                >
                                  Compute & Pay
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === 'sales_return' || activeTab === 'purchase' || activeTab === 'purchase_return' || activeTab === 'ledger' || activeTab === 'reports' || activeTab === 'catalog' || activeTab === 'settings') && (
              <div className={`p-10 rounded-2xl ${cardBgClass} border ${borderClass} text-center space-y-3`}>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-xl font-bold">
                  ⚡
                </div>
                <h3 className={`text-base font-bold ${textPrimary}`}>Module Ready in Full Desktop Application</h3>
                <p className={`text-xs ${textMuted} max-w-md mx-auto`}>
                  You're exploring the live interactive demo. Try switching to <strong>Dashboard</strong>, <strong>Sales</strong>, <strong>Products</strong>, <strong>Parties</strong>, or <strong>Stock</strong> above to experience real live billing and inventory tracking!
                </p>
                <button
                  onClick={() => setActiveTab('sales')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 shadow"
                >
                  Go to Sales Invoices
                </button>
              </div>
            )}
          </main>
        </div>

        {/* BOTTOM STATUSBAR (Exact Windows Desktop Status) */}
        <div className={`px-4 py-2 ${headerBgClass} border-t ${borderClass} flex flex-wrap items-center justify-between text-[11px] ${textMuted}`}>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Offline Database Connected (SQLite v3.45)</span>
            </span>
            <span>
              Shortcuts:{' '}
              <button
                onClick={() => {
                  setActiveTab('sales');
                  setSalesMode('list');
                }}
                className="hover:underline hover:text-blue-600 transition-colors"
              >
                F1 Sales
              </button>{' '}
              •{' '}
              <button
                onClick={() => {
                  setActiveTab('sales');
                  setSalesMode('new_sale');
                }}
                className="hover:underline hover:text-blue-600 font-bold text-blue-500 transition-colors"
              >
                F2 New Bill
              </button>{' '}
              •{' '}
              <button
                onClick={() => {
                  if (salesList.length > 0) {
                    const row = salesList[0];
                    setPreviewInvoice({
                      invoiceNo: row.no,
                      date: row.date,
                      customer: row.customer,
                      phone: '9876543210',
                      gstin: row.gstin || 'Unregistered',
                      amount: row.amount,
                      itemsCount: 1,
                    });
                  }
                }}
                className="hover:underline hover:text-blue-600 transition-colors"
              >
                Enter Print
              </button>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>GST Engine: 24 (Gujarat)</span>
            <span className="font-bold text-blue-600">Signatures Bill Enterprise v1.0</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: LIVE PRINT PREVIEW INVOICE (A4 & 3" THERMAL POS)                   */}
      {/* ========================================================================= */}
      {previewInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-2">
                <span className="text-base">🖨️</span>
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Live Print Preview — {previewInvoice.invoiceNo}
                </span>
              </div>

              {/* Format Toggle */}
              <div className="flex items-center gap-2">
                <div className="p-0.5 rounded-lg bg-slate-800 border border-slate-700 flex text-xs">
                  <button
                    onClick={() => setPreviewFormat('A4')}
                    className={`px-3 py-1 rounded-md font-bold transition-all ${
                      previewFormat === 'A4' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    A4 Full GST
                  </button>
                  <button
                    onClick={() => setPreviewFormat('Thermal')}
                    className={`px-3 py-1 rounded-md font-bold transition-all ${
                      previewFormat === 'Thermal' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    3" Thermal POS
                  </button>
                </div>

                <button
                  onClick={() => setPreviewInvoice(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Printable Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-900 flex justify-center">
              {previewFormat === 'A4' ? (
                /* A4 Sheet */
                <div className="w-full max-w-lg bg-white text-slate-900 p-6 rounded-lg shadow-lg font-sans text-xs space-y-4 border border-slate-300">
                  {/* Business Header matching user company JARI TEXTILE */}
                  <div className="flex justify-between items-start border-b border-slate-300 pb-3">
                    <div>
                      <h1 className="text-base font-extrabold tracking-tight text-slate-900">JARI TEXTILE</h1>
                      <p className="text-[10px] text-slate-600">Textile Market, Ring Road, Surat, Gujarat</p>
                      <p className="text-[10px] text-slate-600">Phone: +91 98250 12345 • GSTIN: 24AAACS1234P1Z1</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                        TAX INVOICE
                      </span>
                      <p className="text-[11px] font-mono font-bold mt-1 text-slate-900">{previewInvoice.invoiceNo}</p>
                      <p className="text-[10px] text-slate-500">Date: {previewInvoice.date}</p>
                    </div>
                  </div>

                  {/* Customer Box */}
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200 grid grid-cols-2 text-[11px]">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-slate-500 block">Billed To:</span>
                      <strong className="text-slate-900 font-semibold">{previewInvoice.customer}</strong>
                      <p className="text-slate-600">Ph: {previewInvoice.phone}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase text-slate-500 block">Customer GSTIN:</span>
                      <span className="font-mono text-slate-900">{previewInvoice.gstin}</span>
                      <p className="text-slate-600">State: Gujarat (24)</p>
                    </div>
                  </div>

                  {/* Table */}
                  <table className="w-full text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-slate-300 bg-slate-100 text-slate-700 font-bold">
                        <th className="py-1.5 px-2">#</th>
                        <th className="py-1.5 px-2">Item</th>
                        <th className="py-1.5 px-2 text-center">Qty</th>
                        <th className="py-1.5 px-2 text-right">Rate</th>
                        <th className="py-1.5 px-2 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {newSaleItems.map((it, idx) => (
                        <tr key={idx}>
                          <td className="py-1.5 px-2 text-slate-500">{idx + 1}</td>
                          <td className="py-1.5 px-2 font-medium">{it.name}</td>
                          <td className="py-1.5 px-2 text-center font-bold">{it.qty} {it.unit}</td>
                          <td className="py-1.5 px-2 text-right font-mono">₹{it.rate.toFixed(2)}</td>
                          <td className="py-1.5 px-2 text-right font-mono font-bold">
                            ₹{it.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Total & QR */}
                  <div className="border-t border-slate-300 pt-3 flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                      <div className="w-12 h-12 bg-slate-100 border border-slate-300 rounded flex items-center justify-center text-slate-600">
                        <QrCode className="w-9 h-9" />
                      </div>
                      <div className="text-[10px] text-slate-600">
                        <strong className="block text-slate-800">Scan & Pay via UPI</strong>
                        <span>Thank you for your business!</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">Grand Total</span>
                      <span className="text-xl font-extrabold font-mono text-slate-900">
                        ₹{previewInvoice.amount.toLocaleString('en-IN')}.00
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Thermal 3-inch POS Slip */
                <div className="w-72 bg-white text-slate-900 p-4 rounded shadow font-mono text-[10px] space-y-2 border border-slate-300">
                  <div className="text-center border-b border-dashed border-slate-400 pb-2">
                    <h2 className="font-extrabold text-xs">JARI TEXTILE</h2>
                    <p className="text-[9px]">Ring Road, Surat, Gujarat</p>
                    <p className="text-[9px]">GSTIN: 24AAACS1234P1Z1</p>
                    <p className="font-bold text-[9px] mt-1">{previewInvoice.invoiceNo}</p>
                    <p className="text-[9px]">{previewInvoice.date}</p>
                  </div>

                  <div className="border-b border-dashed border-slate-400 pb-1">
                    <div className="flex justify-between font-bold">
                      <span>Item</span>
                      <span>Qty x Rate</span>
                      <span>Amt</span>
                    </div>
                    {newSaleItems.map((it, idx) => (
                      <div key={idx} className="flex justify-between py-0.5">
                        <span className="truncate max-w-[100px]">{it.name}</span>
                        <span>{it.qty}x{it.rate}</span>
                        <span className="font-bold">₹{it.amount.toFixed(0)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-right font-extrabold text-sm pt-1">
                    TOTAL: ₹{previewInvoice.amount.toLocaleString('en-IN')}.00
                  </div>

                  <div className="text-center pt-2 border-t border-dashed border-slate-400 text-[9px] text-slate-600">
                    <p>CUSTOMER: {previewInvoice.customer}</p>
                    <p>*** THANK YOU VISIT AGAIN ***</p>
                    <p className="text-[8px] text-slate-400">Powered by SIGNATURES BILL</p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Format: <strong className="text-white">{previewFormat} Slip</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 shadow flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Bill Now</span>
                </button>
                <button
                  onClick={() => setPreviewInvoice(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: SELECT PRODUCT (Exact match with Desktop Screenshot 2)           */}
      {/* ========================================================================= */}
      {showSelectProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#131C2E] border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            {/* Modal Title bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#131C2E]">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-600" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Select Product
                </h3>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <span className="hidden sm:inline-block">↑↓ Navigate</span>
                <span className="font-semibold text-blue-600">⏎ Enter Select</span>
                <span>Esc Close</span>
                <button
                  onClick={() => setShowSelectProductModal(false)}
                  className="hover:text-slate-800 dark:hover:text-white text-slate-400 text-sm ml-1 font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search products by name or code..."
                  value={searchProductQuery}
                  onChange={(e) => setSearchProductQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border-2 border-blue-400 focus:border-blue-600 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white outline-none shadow-xs"
                />
              </div>
            </div>

            {/* Products Table */}
            <div className="flex-1 overflow-y-auto max-h-72">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase">
                  <tr>
                    <th className="py-2.5 px-4">Product Name</th>
                    <th className="py-2.5 px-3">HSN</th>
                    <th className="py-2.5 px-3">Unit</th>
                    <th className="py-2.5 px-3">Sale Rate</th>
                    <th className="py-2.5 px-4 text-right">GST</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {productsList
                    .filter((p) =>
                      p.name.toLowerCase().includes(searchProductQuery.toLowerCase()) ||
                      p.hsn.toLowerCase().includes(searchProductQuery.toLowerCase())
                    )
                    .map((p) => {
                      const isSelected = selectedProductIdInModal === p.id;
                      return (
                        <tr
                          key={p.id}
                          onClick={() => setSelectedProductIdInModal(p.id)}
                          onDoubleClick={() => openAddToInvoiceModal(p)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200 font-semibold'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          <td className="py-2.5 px-4 font-bold">{p.name}</td>
                          <td className="py-2.5 px-3 text-slate-400">{p.hsn || '—'}</td>
                          <td className="py-2.5 px-3 font-semibold">{p.unit}</td>
                          <td className="py-2.5 px-3 font-mono font-bold">₹{p.saleRate.toFixed(2)}</td>
                          <td className="py-2.5 px-4 text-right font-bold text-blue-600 dark:text-blue-400">
                            {p.gst}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs">
                {(() => {
                  const sel = productsList.find((p) => p.id === selectedProductIdInModal) || productsList[0];
                  return (
                    sel && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200">
                        <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>
                          Selected: <strong className="font-extrabold">{sel.name}</strong> ₹{sel.saleRate.toFixed(2)} • {sel.unit} • GST {sel.gst}
                        </span>
                      </span>
                    )
                  );
                })()}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSelectProductModal(false)}
                  className="px-4 py-1.5 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131C2E] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel (Esc)
                </button>
                <button
                  onClick={() => {
                    const sel = productsList.find((p) => p.id === selectedProductIdInModal) || productsList[0];
                    if (sel) openAddToInvoiceModal(sel);
                  }}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#2563EB] hover:bg-blue-700 text-white shadow-sm transition-all"
                >
                  Select Product (Enter)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD TO INVOICE (Exact match with Desktop Screenshot 3)            */}
      {/* ========================================================================= */}
      {showAddToInvoiceModal && modalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#131C2E] border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#131C2E]">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600 fill-blue-600" />
                <h3 className="font-extrabold text-sm text-blue-600 tracking-wider">
                  ADD TO INVOICE
                </h3>
              </div>
              <button
                onClick={() => setShowAddToInvoiceModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Product Name & Code */}
              <div>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {modalProduct.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Code/Barcode: —</p>
              </div>

              {/* Row 1: Sale Rate, MRP, Unit */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Sale Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={modalProductRate}
                    onChange={(e) => setModalProductRate(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white font-bold text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    MRP
                  </label>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500">
                    ₹0.00
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Unit
                  </label>
                  <div className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
                    {modalProduct.unit}
                  </div>
                </div>
              </div>

              {/* Row 2: Pricing toggle & GST */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Pricing
                  </label>
                  <div className="flex rounded-lg p-0.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setModalProductPricing('include_gst')}
                      className={`flex-1 py-1 rounded-md text-xs font-bold transition-all ${
                        modalProductPricing === 'include_gst'
                          ? 'bg-[#2563EB] text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                      }`}
                    >
                      Include GST
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalProductPricing('+ GST')}
                      className={`flex-1 py-1 rounded-md text-xs font-bold transition-all ${
                        modalProductPricing === '+ GST'
                          ? 'bg-[#2563EB] text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                      }`}
                    >
                      + GST
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    GST
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      value={modalProductGst}
                      onChange={(e) => setModalProductGst(parseInt(e.target.value) || 5)}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="0">0%</option>
                      <option value="5">5%</option>
                      <option value="12">12%</option>
                      <option value="18">18%</option>
                      <option value="28">28%</option>
                    </select>
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-blue-600 dark:text-blue-400 rounded-md text-[10px] font-extrabold tracking-wider">
                      C+S
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 3: Qty & Discount */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Quantity ({modalProduct.unit})
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={modalProductQty}
                    onChange={(e) => setModalProductQty(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-1.5 rounded-lg border-2 border-blue-400 focus:border-blue-600 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white text-xs font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={modalProductDiscount}
                    onChange={(e) => setModalProductDiscount(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Helper text */}
              <div className="pt-2 text-center text-[10px] text-slate-400 font-medium">
                ⏎ Enter Next Field / Add • Esc Cancel
              </div>
            </div>

            {/* Footer buttons */}
            <div className="px-5 py-3.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setShowAddToInvoiceModal(false)}
                className="px-5 py-1.5 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131C2E] text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel (Esc)
              </button>
              <button
                onClick={handleSaveModalItem}
                className="px-5 py-1.5 rounded-xl text-xs font-bold bg-[#2563EB] hover:bg-blue-700 text-white shadow-sm transition-all"
              >
                Add to Invoice (Enter)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: ADD PARTY MODAL (Exact match with Screenshots 1 & 2)             */}
      {/* ========================================================================= */}
      {showAddPartyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#131C2E] border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#131C2E]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Add Party
                </h3>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {newPartyForm.code}
                </span>
              </div>
              <button
                onClick={() => setShowAddPartyModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 dark:text-slate-300">
              {/* SECTION 1: Basic Details */}
              <div className="space-y-3">
                <h4 className="font-bold text-blue-600 dark:text-blue-400 text-xs">
                  Basic Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Party Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. MAHAVIR TEXTILE CORP"
                      value={newPartyForm.name}
                      onChange={(e) => setNewPartyForm({ ...newPartyForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Party Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newPartyForm.type}
                      onChange={(e) => setNewPartyForm({ ...newPartyForm, type: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-medium"
                    >
                      <option value="Customer">Customer</option>
                      <option value="Supplier">Supplier</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Bhai"
                      value={newPartyForm.contactPerson}
                      onChange={(e) => setNewPartyForm({ ...newPartyForm, contactPerson: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 98250 12345"
                      value={newPartyForm.phone}
                      onChange={(e) => setNewPartyForm({ ...newPartyForm, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Alternate Phone
                    </label>
                    <input
                      type="text"
                      placeholder="Optional landline or mobile"
                      value={newPartyForm.alternatePhone}
                      onChange={(e) => setNewPartyForm({ ...newPartyForm, alternatePhone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. accounts@party.com"
                      value={newPartyForm.email}
                      onChange={(e) => setNewPartyForm({ ...newPartyForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: GST & Tax Information */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-blue-600 dark:text-blue-400 text-xs">
                  GST & Tax Information
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      GST Registration
                    </label>
                    <select
                      value={newPartyForm.gstRegistration}
                      onChange={(e) => setNewPartyForm({ ...newPartyForm, gstRegistration: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-medium"
                    >
                      <option value="Unregistered">Unregistered</option>
                      <option value="Regular">Regular</option>
                      <option value="Composition">Composition</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      GSTIN / UIN Number
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="24AAAAA0000A1Z5"
                        value={newPartyForm.gstin}
                        onChange={(e) => setNewPartyForm({ ...newPartyForm, gstin: e.target.value.toUpperCase() })}
                        disabled={newPartyForm.gstRegistration === 'Unregistered'}
                        className={`flex-1 px-3 py-2 rounded-xl border font-mono ${
                          newPartyForm.gstRegistration === 'Unregistered'
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 cursor-not-allowed'
                            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:border-blue-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newPartyForm.gstin) {
                            alert(`GSTIN ${newPartyForm.gstin} verified on GST Portal: Active taxpayer.`);
                          } else {
                            alert('Please enter a GSTIN first.');
                          }
                        }}
                        className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 flex items-center gap-1"
                      >
                        <Search className="w-3.5 h-3.5" />
                        <span>Verify</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newPartyForm.state}
                      onChange={(e) => setNewPartyForm({ ...newPartyForm, state: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-medium"
                    >
                      <option value="24 - Gujarat">24 - Gujarat</option>
                      <option value="27 - Maharashtra">27 - Maharashtra</option>
                      <option value="08 - Rajasthan">08 - Rajasthan</option>
                      <option value="07 - Delhi">07 - Delhi</option>
                      <option value="09 - Uttar Pradesh">09 - Uttar Pradesh</option>
                      <option value="23 - Madhya Pradesh">23 - Madhya Pradesh</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      placeholder="ABCDE1234F"
                      value={newPartyForm.pan}
                      onChange={(e) => setNewPartyForm({ ...newPartyForm, pan: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Legal Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Registered company name"
                      value={newPartyForm.legalName}
                      onChange={(e) => setNewPartyForm({ ...newPartyForm, legalName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Trade Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Brand or shop name"
                      value={newPartyForm.tradeName}
                      onChange={(e) => setNewPartyForm({ ...newPartyForm, tradeName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Address Details */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-blue-600 dark:text-blue-400 text-xs">
                  Address Details
                </h4>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Shop / Unit No, Market / Complex Name"
                    value={newPartyForm.addressLine1}
                    onChange={(e) => setNewPartyForm({ ...newPartyForm, addressLine1: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Road, Area, Landmark"
                    value={newPartyForm.addressLine2}
                    onChange={(e) => setNewPartyForm({ ...newPartyForm, addressLine2: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      City / Town <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Surat"
                      value={newPartyForm.city}
                      onChange={(e) => setNewPartyForm({ ...newPartyForm, city: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      PIN Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="395001"
                      value={newPartyForm.pincode}
                      onChange={(e) => setNewPartyForm({ ...newPartyForm, pincode: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 4: Opening Balance & Credit Terms */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-blue-600 dark:text-blue-400 text-xs">
                  Opening Balance & Credit Terms
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Opening Balance (₹)
                    </label>
                    <input
                      type="number"
                      value={newPartyForm.openingBalance}
                      onChange={(e) => setNewPartyForm({ ...newPartyForm, openingBalance: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Balance Type
                    </label>
                    <select
                      value={newPartyForm.balanceType}
                      onChange={(e) => setNewPartyForm({ ...newPartyForm, balanceType: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-medium"
                    >
                      <option value="Receivable">Receivable</option>
                      <option value="Payable">Payable</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Credit Limit (₹)
                    </label>
                    <input
                      type="number"
                      value={newPartyForm.creditLimit}
                      onChange={(e) => setNewPartyForm({ ...newPartyForm, creditLimit: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Payment Terms
                    </label>
                    <select
                      value={newPartyForm.paymentTerms}
                      onChange={(e) => setNewPartyForm({ ...newPartyForm, paymentTerms: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-medium"
                    >
                      <option value="30 Days">30 Days</option>
                      <option value="15 Days">15 Days</option>
                      <option value="45 Days">45 Days</option>
                      <option value="60 Days">60 Days</option>
                      <option value="Immediate / COD">Immediate / COD</option>
                    </select>
                  </div>
                </div>

                {/* Active switch */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setNewPartyForm({ ...newPartyForm, isActive: !newPartyForm.isActive })}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                      newPartyForm.isActive ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                        newPartyForm.isActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Active Party
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Buttons matching Screenshots 1 & 2 */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowAddPartyModal(false)}
                className="px-5 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131C2E] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewParty}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-[#2563EB] hover:bg-blue-700 text-white shadow-md transition-all active:scale-95"
              >
                Save Party
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: ADD PRODUCT MODAL (Exact match with Screenshot 3)                */}
      {/* ========================================================================= */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#131C2E] border border-slate-200 dark:border-slate-800 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#131C2E]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <Package className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Add Product
                </h3>
              </div>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body matching Screenshot 3 */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 dark:text-slate-300">
              {/* Product Name */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 9 tar yarn or Jari 100/12"
                  value={newProdForm.name}
                  onChange={(e) => setNewProdForm({ ...newProdForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>

              {/* Barcode & Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Barcode / Product Code (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Scan or enter code"
                    value={newProdForm.barcode}
                    onChange={(e) => setNewProdForm({ ...newProdForm, barcode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Scan barcode or enter code manually
                  </span>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Unit <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newProdForm.unit}
                    onChange={(e) => setNewProdForm({ ...newProdForm, unit: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-medium"
                  >
                    <option value="PCS">PCS</option>
                    <option value="KG">KG</option>
                    <option value="MTR">MTR</option>
                    <option value="BOX">BOX</option>
                    <option value="SET">SET</option>
                    <option value="ROLL">ROLL</option>
                    <option value="DOZEN">DOZEN</option>
                  </select>
                </div>
              </div>

              {/* Rates: Purchase, Sale, MRP */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Purchase Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={newProdForm.purchaseRate}
                    onChange={(e) => setNewProdForm({ ...newProdForm, purchaseRate: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Sale Rate (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={newProdForm.saleRate}
                    onChange={(e) => setNewProdForm({ ...newProdForm, saleRate: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    MRP (₹)
                  </label>
                  <input
                    type="number"
                    value={newProdForm.mrp}
                    onChange={(e) => setNewProdForm({ ...newProdForm, mrp: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              {/* HSN, GST, Disc */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    HSN Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5208"
                    value={newProdForm.hsn}
                    onChange={(e) => setNewProdForm({ ...newProdForm, hsn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    GST Rate
                  </label>
                  <select
                    value={newProdForm.gstRate}
                    onChange={(e) => setNewProdForm({ ...newProdForm, gstRate: parseInt(e.target.value) || 5 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-medium"
                  >
                    <option value="0">0%</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Default Disc %
                  </label>
                  <input
                    type="number"
                    value={newProdForm.defaultDisc}
                    onChange={(e) => setNewProdForm({ ...newProdForm, defaultDisc: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              {/* CARD: Sale Rate Includes GST (Tax Inclusive vs Exclusive) matching Screenshot 3 */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                      Sale Rate Includes GST
                    </span>
                    <span className="text-[10px] text-slate-400 ml-1.5">
                      (Tax Inclusive vs Exclusive)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setNewProdForm({ ...newProdForm, includeGst: !newProdForm.includeGst })}
                      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                        newProdForm.includeGst ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                          newProdForm.includeGst ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                    <span className="text-[11px] font-bold font-mono text-slate-500 dark:text-slate-400">
                      {newProdForm.includeGst ? 'ON' : 'OFF'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/80 dark:border-slate-800">
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Taxable Rate</span>
                    <span className="text-xs font-bold font-mono text-slate-900 dark:text-white">
                      ₹{newProdTaxable.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">GST Amount</span>
                    <span className="text-xs font-bold font-mono text-blue-600 dark:text-blue-400">
                      ₹{newProdGstAmount.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">Final Customer Price</span>
                    <span className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                      ₹{newProdFinalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stock Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Opening Stock
                  </label>
                  <input
                    type="number"
                    value={newProdForm.openingStock}
                    onChange={(e) => setNewProdForm({ ...newProdForm, openingStock: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Minimum Stock Alert
                  </label>
                  <input
                    type="number"
                    value={newProdForm.minStockAlert}
                    onChange={(e) => setNewProdForm({ ...newProdForm, minStockAlert: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              {/* Active switch */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setNewProdForm({ ...newProdForm, isActive: !newProdForm.isActive })}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                    newProdForm.isActive ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      newProdForm.isActive ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Active Product
                </span>
              </div>
            </div>

            {/* Footer Buttons matching Screenshot 3 */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowAddProductModal(false)}
                className="px-5 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131C2E] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewProduct}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-[#2563EB] hover:bg-blue-700 text-white shadow-md transition-all active:scale-95"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: COMMAND PALETTE / QUICK SEARCH (Ctrl+K) (Screenshot 4)           */}
      {/* ========================================================================= */}
      {showQuickSearchModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#131C2E] border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Search Input Bar */}
            <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <Search className="w-4 h-4 text-blue-600" />
              <input
                type="text"
                placeholder="Search anything... (Ctrl+K)"
                value={quickSearchQuery}
                onChange={(e) => setQuickSearchQuery(e.target.value)}
                autoFocus
                className="w-full text-xs font-medium text-slate-900 dark:text-white bg-transparent outline-none placeholder:text-slate-400"
              />
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold border border-slate-200 dark:border-slate-700">
                Ctrl+K
              </span>
            </div>

            {/* List Body matching Screenshot 4 */}
            <div className="p-2 space-y-3 max-h-[70vh] overflow-y-auto text-xs">
              {/* SECTION: QUICK ACTIONS */}
              <div>
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  QUICK ACTIONS
                </div>
                <div className="space-y-0.5">
                  {/* Action 1: Indian Festival Calendar */}
                  <button
                    onClick={() => {
                      setShowQuickSearchModal(false);
                      setShowFestivalModal(true);
                    }}
                    className="w-full px-3 py-2 rounded-xl flex items-start gap-3 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-left transition-colors group cursor-pointer"
                  >
                    <div className="mt-0.5 p-1 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        Indian Festival Calendar
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Browse verified 2026–2040 Indian festivals & Panchang holidays
                      </div>
                    </div>
                  </button>

                  {/* Action 2: New Sale Invoice */}
                  <button
                    onClick={() => {
                      setShowQuickSearchModal(false);
                      setActiveTab('sales');
                      setSalesMode('new_sale');
                    }}
                    className="w-full px-3 py-2 rounded-xl flex items-start gap-3 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-left transition-colors group cursor-pointer"
                  >
                    <div className="mt-0.5 p-1 rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        New Sale Invoice
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Create a new sales invoice or bill
                      </div>
                    </div>
                  </button>

                  {/* Action 3: New Purchase Bill */}
                  <button
                    onClick={() => {
                      setShowQuickSearchModal(false);
                      setActiveTab('purchase');
                    }}
                    className="w-full px-3 py-2 rounded-xl flex items-start gap-3 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-left transition-colors group cursor-pointer"
                  >
                    <div className="mt-0.5 p-1 rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      <ShoppingCart className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        New Purchase Bill
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Enter a new purchase transaction
                      </div>
                    </div>
                  </button>

                  {/* Action 4: Add New Party */}
                  <button
                    onClick={() => {
                      setShowQuickSearchModal(false);
                      setShowAddPartyModal(true);
                    }}
                    className="w-full px-3 py-2 rounded-xl flex items-start gap-3 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-left transition-colors group cursor-pointer"
                  >
                    <div className="mt-0.5 p-1 rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        Add New Party
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Create customer or supplier account
                      </div>
                    </div>
                  </button>

                  {/* Action 5: Add New Product */}
                  <button
                    onClick={() => {
                      setShowQuickSearchModal(false);
                      setShowAddProductModal(true);
                    }}
                    className="w-full px-3 py-2 rounded-xl flex items-start gap-3 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-left transition-colors group cursor-pointer"
                  >
                    <div className="mt-0.5 p-1 rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      <Package className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        Add New Product
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        Add a new product with stock & rate
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* SECTION: PAGES */}
              <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  PAGES
                </div>
                <div className="space-y-0.5">
                  <button
                    onClick={() => {
                      setShowQuickSearchModal(false);
                      setActiveTab('dashboard');
                    }}
                    className="w-full px-3 py-2 rounded-xl flex items-start gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4 mt-0.5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Dashboard</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Business overview & KPI summaries</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setShowQuickSearchModal(false);
                      setActiveTab('sales');
                      setSalesMode('list');
                    }}
                    className="w-full px-3 py-2 rounded-xl flex items-start gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4 mt-0.5 text-slate-500" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Sales</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Invoices, billing & estimates</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setShowQuickSearchModal(false);
                      setActiveTab('purchase');
                    }}
                    className="w-full px-3 py-2 rounded-xl flex items-start gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 mt-0.5 text-slate-500" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Purchase</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Purchase bills & supplier orders</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setShowQuickSearchModal(false);
                      setActiveTab('ems');
                    }}
                    className="w-full px-3 py-2 rounded-xl flex items-start gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 text-left transition-colors cursor-pointer"
                  >
                    <Users className="w-4 h-4 mt-0.5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">EMS / Staff</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">Factory Employee & Salary Management</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Bar matching Screenshot 4 */}
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span>Navigate <strong className="font-mono text-slate-700 dark:text-slate-300">↑ ↓</strong></span>
                <span>Select <strong className="font-mono text-slate-700 dark:text-slate-300">⏎ Enter</strong></span>
              </div>
              <div>
                <span>Close <strong className="font-mono text-slate-700 dark:text-slate-300">Esc</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: INDIAN FESTIVAL CALENDAR (2026-2040)                             */}
      {/* ========================================================================= */}
      {showFestivalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#131C2E] border border-slate-200 dark:border-slate-800 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[88vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#131C2E]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg">
                  📅
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                    Indian Festival & Muhurat Calendar ({selectedFestivalYear})
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Verified Hindu Panchang & Surat Textile Market Trading Holidays (2026 — 2040)
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowFestivalModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter and Year selector */}
            <div className="px-6 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Year Select Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
                <span className="font-semibold text-slate-500 mr-1">Year:</span>
                {[2026, 2027, 2028, 2029, 2030, 2031, 2032].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedFestivalYear(yr)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      selectedFestivalYear === yr
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white dark:bg-[#0B0F19] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-1">
                {(['All', 'Major Festivals', 'Muhurat', 'Holidays'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFestivalCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      festivalCategory === cat
                        ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Festivals List */}
            <div className="p-6 overflow-y-auto space-y-2.5 max-h-[60vh]">
              {getFestivalsForYear(selectedFestivalYear)
                .filter((f) => festivalCategory === 'All' || f.category === festivalCategory)
                .map((fest, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-start gap-3">
                      <div className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 font-mono font-bold text-xs text-blue-700 dark:text-blue-300 whitespace-nowrap">
                        {fest.date}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {fest.name}
                          </span>
                          {fest.marketHoliday ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-800">
                              Market Holiday
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                              Shubh Muhurat
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Tithi: <span className="font-medium text-slate-700 dark:text-slate-300">{fest.tithi}</span> • {fest.notes}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <span className="text-[11px] font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                        {fest.category}
                      </span>
                    </div>
                  </div>
                ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Panchang verified against Vikram Samvat 2083 & Indian Astronomical Ephemeris
              </span>
              <button
                onClick={() => setShowFestivalModal(false)}
                className="px-5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 7: COMPUTE & PAY SALARY SLIP (EMS Settlement with custom deduction) */}
      {/* ========================================================================= */}
      {showSalaryPayModal && selectedEmpForSalary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#131C2E] border border-slate-200 dark:border-slate-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#131C2E]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Salary Settlement — September 2026
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {selectedEmpForSalary.name} ({selectedEmpForSalary.code}) • {selectedEmpForSalary.role}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSalaryPayModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Calculations Body */}
            {(() => {
              const grossEarned =
                selectedEmpForSalary.wageType === 'Monthly'
                  ? selectedEmpForSalary.rate
                  : selectedEmpForSalary.rate * selectedEmpForSalary.presentDays;
              const advanceDeducted = selectedEmpForSalary.advanceTaken;
              const netToPay = Math.max(0, grossEarned - advanceDeducted - salaryCustomDeduction + salaryBonusAmount);

              return (
                <div className="p-6 space-y-4 text-xs text-slate-700 dark:text-slate-300">
                  {/* Attendance & Gross */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Attendance</span>
                      <strong className="text-sm font-bold text-slate-800 dark:text-white">
                        {selectedEmpForSalary.presentDays} / {selectedEmpForSalary.totalWorkingDays} Days Present
                      </strong>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 block">Gross Base Pay</span>
                      <strong className="text-sm font-bold font-mono text-slate-800 dark:text-white">
                        ₹{grossEarned.toLocaleString('en-IN')}.00
                      </strong>
                    </div>
                  </div>

                  {/* Advance deduction indicator */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20">
                    <div>
                      <span className="font-semibold text-red-700 dark:text-red-400">Cash Advance Taken in Month</span>
                      <p className="text-[10px] text-slate-500">Auto-deducted from monthly disbursement</p>
                    </div>
                    <span className="font-mono font-bold text-red-600 text-sm">
                      - ₹{advanceDeducted.toFixed(2)}
                    </span>
                  </div>

                  {/* User-requested feature: Custom manual deduction editing */}
                  <div className="space-y-1.5 p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20">
                    <label className="block text-[11px] font-bold text-amber-800 dark:text-amber-400">
                      Custom Absent / Late Penalty Adjustment (₹)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={salaryCustomDeduction}
                        onChange={(e) => setSalaryCustomDeduction(parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                        className="w-32 px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white font-mono font-bold text-xs outline-none"
                      />
                      <input
                        type="text"
                        value={salaryDeductionReason}
                        onChange={(e) => setSalaryDeductionReason(e.target.value)}
                        placeholder="Reason (e.g. 1 day leave cut or late)"
                        className="flex-1 px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white text-xs outline-none"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500">
                      User requested feature: User manually 150/200/300 edit kar sake or set to 0 if not cutting salary.
                    </p>
                  </div>

                  {/* Festival Bonus / Incentive */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      Festival Bonus / Overtime Addition (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={salaryBonusAmount}
                      onChange={(e) => setSalaryBonusAmount(parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white font-mono text-xs outline-none"
                    />
                  </div>

                  {/* Net Payable Banner */}
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 block">
                        Net Disbursable Salary
                      </span>
                      <span className="text-[10px] text-slate-500">
                        After advances & absent deductions
                      </span>
                    </div>
                    <span className="text-xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                      ₹{netToPay.toLocaleString('en-IN')}.00
                    </span>
                  </div>

                  {/* Footer actions */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      onClick={() => setShowSalaryPayModal(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131C2E] text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setShowSalaryPayModal(false);
                        setEmployeesList(
                          employeesList.map((e) =>
                            e.code === selectedEmpForSalary.code
                              ? { ...e, advanceTaken: 0, lastPaidPeriod: 'September 2026' }
                              : e
                          )
                        );
                        setSalarySuccessToast(
                          `Salary of ₹${netToPay.toLocaleString('en-IN')} successfully settled and disbursed for ${selectedEmpForSalary.name}! Cycle moved forward.`
                        );
                      }}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95"
                    >
                      Mark Settle & Pay
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 8: ADD NEW EMPLOYEE MODAL (EMS)                                     */}
      {/* ========================================================================= */}
      {showAddEmployeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#131C2E] border border-slate-200 dark:border-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#131C2E]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Add Factory Employee
                </h3>
              </div>
              <button
                onClick={() => setShowAddEmployeeModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Employee Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mukesh Yadav"
                  value={newEmpForm.name}
                  onChange={(e) => setNewEmpForm({ ...newEmpForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Designation / Role
                  </label>
                  <input
                    type="text"
                    placeholder="Operator / Helper"
                    value={newEmpForm.role}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    placeholder="Weaving / Packaging"
                    value={newEmpForm.department}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Wage Basis
                  </label>
                  <select
                    value={newEmpForm.wageType}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, wageType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white outline-none font-medium"
                  >
                    <option value="Monthly">Monthly Fixed</option>
                    <option value="Daily">Daily Wages</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Rate (₹)
                  </label>
                  <input
                    type="number"
                    value={newEmpForm.rate}
                    onChange={(e) => setNewEmpForm({ ...newEmpForm, rate: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white font-mono outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Mobile Number
                </label>
                <input
                  type="text"
                  placeholder="98250 00000"
                  value={newEmpForm.phone}
                  onChange={(e) => setNewEmpForm({ ...newEmpForm, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowAddEmployeeModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131C2E] text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEmployee}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md active:scale-95"
                >
                  Save Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
