// overlay cards======================================
document.addEventListener('DOMContentLoaded', () => {
    const learnMoreButtons = document.querySelectorAll('.learn-more');
    const serviceOverlay = document.getElementById('serviceOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeOverlayButton = document.getElementById('closeOverlay');

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            const title = button.getAttribute('data-modal-title');
            const description = button.getAttribute('data-modal-description');

            modalTitle.textContent = title;
            modalDescription.textContent = description;

            serviceOverlay.classList.add('active');
        });
    });

    closeOverlayButton.addEventListener('click', () => {
        serviceOverlay.classList.remove('active');
    });

    // Close overlay when clicking outside the modal content
    serviceOverlay.addEventListener('click', (event) => {
        if (event.target === serviceOverlay) {
            serviceOverlay.classList.remove('active');
        }
    });
});

// numbers section======================================
// ننتظر تحميل كل عناصر الصفحة أولاً قبل تنفيذ الكود
document.addEventListener('DOMContentLoaded', () => {
    // نحصل على عنصر العداد من خلال ID
    const websiteVisitorsCounter = document.getElementById('websiteVisitorsCounter');

    // نأخذ القيمة الابتدائية من خاصية data-initial-visitors الموجودة في HTML
    const initialVisitorsTarget = +websiteVisitorsCounter.getAttribute('data-initial-visitors');

    // نحاول قراءة قيمة عدد الزوار من localStorage (لتخزينها محليًا في المتصفح)
    let currentVisitors = localStorage.getItem('websiteVisitors');

    // لو لم توجد القيمة أو كانت غير صالحة (ليست رقمًا)، نبدأ من القيمة الابتدائية
    if (currentVisitors === null || isNaN(parseInt(currentVisitors))) {
        currentVisitors = initialVisitorsTarget;
    } else {
        // نحول القيمة إلى رقم صحيح
        currentVisitors = parseInt(currentVisitors, 10);
    }

    // نزيد العدد بواحد عند كل زيارة أو تحديث للصفحة
    currentVisitors++;

    // نحفظ العدد الجديد في localStorage
    localStorage.setItem('websiteVisitors', currentVisitors);

    // نعرض العدد المحدث في الصفحة
    websiteVisitorsCounter.textContent = currentVisitors;

    // نحدد كل العناصر التي تحتوي على الأرقام المتحركة، ما عدا عداد الزوار
    const counters = document.querySelectorAll('.counter-number:not(#websiteVisitorsCounter)');

    // سرعة العد (كلما كان أقل، كلما كان العد أسرع)
    const speed = 200;

    // دالة تنفيذ العد المتحرك
    const animateCounter = (counter) => {
        // نحصل على الهدف النهائي من خاصية data-target
        const target = +counter.getAttribute('data-target');
        let count = 0; // نبدأ من صفر

        // مقدار الزيادة في كل خطوة
        const increment = target / speed;

        // دالة تحديث الرقم تدريجيًا
        const updateCount = () => {
            if (count < target) {
                // نزيد الرقم
                count += increment;
                // نعرض الرقم الحالي في الصفحة
                counter.textContent = Math.ceil(count);
                // نكرر العملية في الإطار التالي
                requestAnimationFrame(updateCount);
            } else {
                // إذا وصلنا للهدف، نثبت الرقم النهائي
                counter.textContent = target;
            }
        };

        // نبدأ العد
        updateCount();
    };

    // خصائص المراقبة
    const options = {
        root: null, // يعني نستخدم نافذة المتصفح كمجال للرؤية
        rootMargin: '0px', // لا نضيف أي هامش
        threshold: 0.7 // يبدأ العد عندما يظهر 70% من العنصر في الشاشة
    };

    // إنشاء المراقب
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // نتأكد أن العنصر ليس عداد الزوار
                if (entry.target.id !== 'websiteVisitorsCounter') {
                    // نشغل دالة العد المتحرك
                    animateCounter(entry.target);
                    // نوقف مراقبة العنصر بعد تشغيله لمرة واحدة
                    observer.unobserve(entry.target);
                }
            }
        });
    }, options);

    // نبدأ مراقبة كل عداد موجود
    counters.forEach(counter => {
        observer.observe(counter);
    });
});
// جلب العناصر من الصفحة باستخدام معرفاتها أو الكلاسات
const aiToggleButton = document.getElementById('aiToggleButton'); // زر فتح نافذة الشات
const aiChatOverlay = document.getElementById('aiChatOverlay'); // غطاء أو نافذة الشات
const aiCloseButton = document.getElementById('aiCloseButton'); // زر إغلاق نافذة الشات
const aiQuestionItems = document.querySelectorAll('.ai-questions-list ul li'); // العناصر (الأسئلة) التي يمكن النقر عليها
const aiAnswerText = document.getElementById('aiAnswerText'); // مكان عرض الإجابة

// عند الضغط على زر فتح الشات
aiToggleButton.addEventListener('click', () => {
    aiChatOverlay.classList.add('active'); // إظهار النافذة بإضافة كلاس "active"
    aiAnswerText.textContent = "Click on a question to see the answer."; // إعادة ضبط الإجابة المعروضة
});

// عند الضغط على زر الإغلاق
aiCloseButton.addEventListener('click', () => {
    aiChatOverlay.classList.remove('active'); // إخفاء نافذة الشات
});

// إذا تم الضغط على أي مكان خارج نافذة المحتوى (الضغط على الخلفية نفسها)
aiChatOverlay.addEventListener('click', (event) => {
    if (event.target === aiChatOverlay) {
        aiChatOverlay.classList.remove('active'); // إغلاق الشات إذا تم الضغط خارج الصندوق
    }
});

// عند الضغط على أي سؤال في القائمة
aiQuestionItems.forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.getAttribute('data-answer'); // جلب الإجابة من خاصية data-answer
        aiAnswerText.textContent = answer; // عرض الإجابة في العنصر المخصص
    });
});


