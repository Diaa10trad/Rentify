function ItemDescription() {
  const productDescription = `إعلان كاميرا [اسم الماركة أو الموديل]

احصل على لحظاتك بأعلى جودة مع كاميرا [اسم الماركة أو الموديل]
هل تبحث عن أداة مثالية لتوثيق لحظاتك الثمينة؟ كاميرا [اسم الماركة أو الموديل] هي الحل الأمثل لك!

الميزات الرائعة لكاميرا [اسم الماركة أو الموديل]:

دقة مذهلة: استمتع بتفاصيل فائقة الوضوح مع مستشعر بدقة [عدد الميجابكسل] ميجابكسل.
فيديو بجودة 4K: التقط فيديوهات احترافية بدقة 4K لتوثيق كل لحظة بكل جمالها.

تقنية تثبيت الصورة البصرية (OIS): ودّع الصور المهزوزة والتقط صورًا ثابتة حتى في الظروف الصعبة.
عدسة متعددة الأغراض: تصوير عريض، تصوير بزاوية ضيقة، تصوير ليلي، وكل ما تحتاجه في عدسة واحدة.
تصميم مدمج وأنيق: سهولة الحمل والاستخدام، مصممة لتناسب أسلوب حياتك النشط.
اتصال لاسلكي: شارك صورك وفيديوهاتك فورًا عبر الواي فاي والبلوتوث.
بطارية طويلة الأمد: تصوير مستمر لساعات دون انقطاع، بفضل البطارية عالية الأداء.
لماذا تختار كاميرا [اسم الماركة أو الموديل]؟
جودة غير مسبوقة: لأن التفاصيل تصنع الفرق.

سهولة الاستخدام: واجهة مستخدم بسيطة ومميزة تجعل التصوير متعة.

موثوقية: مصنعة من مواد عالية الجودة لضمان عمر طويل وأداء مستقر.

دعم فني ممتاز: فريق دعم جاهز لمساعدتك في أي وقت.

اقتنِ كاميرا [اسم الماركة أو الموديل] الآن!
لا تفوت الفرصة واحصل على كاميرا [اسم الماركة أو الموديل] بسعر خاص لفترة محدودة. اجعل من لحظاتك ذكريات لا تُنسى بجودة استثنائية.`;
  return (
    <div className="">
      <h3 className="mb-4 bg-primary text-white rounded-top-4 p-4 shadow">
        الوصف
      </h3>
      <p style={{ whiteSpace: "pre-wrap" }}>{productDescription}</p>
    </div>
  );
}
export default ItemDescription;
