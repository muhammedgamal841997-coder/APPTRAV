# طريقة 1: بناء الـ APK أونلاين (من غير كمبيوتر قوي)
1. اعمل حساب على github.com وافتح Repository جديد.
2. ارفع كل ملفات المشروع ده (بما فيها فولدر .github).
3. روح تاب Actions ← Build APK ← Run workflow.
4. استنى ~5 دقايق، وبعدها نزّل الملف من Artifacts: music-video-apk.
5. فك الضغط وثبّت app-debug.apk على الموبايل (فعّل "التثبيت من مصادر غير معروفة").

# طريقة 2: على الكمبيوتر
npm install
npm run build
npx cap add android
npx cap sync android
npx cap open android   # ثم Build > Build APK(s) من Android Studio
