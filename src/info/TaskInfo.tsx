export interface Task {
    taskId: number;
    title: string;
    description: string;
    status: 'pending' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    diary: string;
}

export const tasks: Task[] = [
    {
        taskId: 1,
        title: "نوشتن گزارش هفتگی",
        description: "جمع‌بندی عملکرد تیم و آماده‌سازی گزارش برای جلسه روز دوشنبه",
        status: "in-progress",
        priority: "high",
        diary: "1404-08-05"
    },
    {
        taskId: 2,
        title: "بررسی ایمیل‌های کاری",
        description: "پاسخ‌دادن به ایمیل‌های مشتریان و شرکای تجاری",
        status: "pending",
        priority: "medium",
        diary: "1404-08-06"
    },
    {
        taskId: 3,
        title: "به‌روزرسانی وب‌سایت",
        description: "افزودن بخش اخبار جدید و اصلاح لینک‌های خراب",
        status: "completed",
        priority: "high",
        diary: "1404-08-03"
    },
    {
        taskId: 4,
        title: "جلسه با تیم طراحی",
        description: "مرور طرح‌های جدید برای کمپین تبلیغاتی آبان‌ماه",
        status: "in-progress",
        priority: "medium",
        diary: "1404-08-07"
    },
    {
        taskId: 5,
        title: "تهیه فاکتورهای مالی",
        description: "بررسی و ثبت فاکتورهای هزینه‌های ماه گذشته",
        status: "pending",
        priority: "low",
        diary: "1404-08-10"
    }
];

