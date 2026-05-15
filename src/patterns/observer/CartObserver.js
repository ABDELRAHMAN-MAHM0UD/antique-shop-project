class CartObserver {
  constructor() {
    this.operationHistory = [];
    this.maxHistorySize = 10; // احتفظ بآخر 10 عمليات
  }

  // عند إضافة منتج
  notifyProductAdded(product, quantity) {
    const entry = {
      type: 'ADD',
      id: product.id,
      name: product.name,
      quantity,
      price: product.price,
      total: product.price * quantity,
      timestamp: new Date().toLocaleTimeString('ar-EG'),
    };

    this.logOperation(entry);
  }

  // عند حذف منتج
  notifyProductRemoved(productName) {
    const entry = {
      type: 'REMOVE',
      name: productName,
      timestamp: new Date().toLocaleTimeString('ar-EG'),
    };

    this.logOperation(entry);
  }

  // تسجيل العملية
  logOperation(entry) {
    this.operationHistory.push(entry);
    
    // احتفظ بآخر 10 عمليات فقط
    if (this.operationHistory.length > this.maxHistorySize) {
      this.operationHistory.shift();
    }

    this.displayLog(entry);
  }

  // عرض جميل في console
  displayLog(entry) {
    if (entry.type === 'ADD') {
      console.log(
        `%c✅ منتج مضاف: ${entry.name}`,
        'color: #4CAF50; font-weight: bold; font-size: 12px'
      );
      console.log(
        `%c📦 الكمية: ${entry.quantity} | الإجمالي: ${entry.total} EGP | ${entry.timestamp}`,
        'color: #2196F3; font-size: 11px'
      );
    } else if (entry.type === 'REMOVE') {
      console.log(
        `%c❌ منتج حُذف: ${entry.name} | ${entry.timestamp}`,
        'color: #f44336; font-weight: bold; font-size: 11px'
      );
    }
  }

  // طلع السجل كاملاً
  getOperationHistory() {
    return this.operationHistory;
  }

  // نظف السجل
  clearHistory() {
    this.operationHistory = [];
  }
}

export default CartObserver;
