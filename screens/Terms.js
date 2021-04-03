import React from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import style from "../style";
import AntDesign from "react-native-vector-icons/AntDesign";
import strings from "../strings.json";
import { LinearGradient } from "expo-linear-gradient";
import linearGradient from "../components/linearGradient";

const { width } = Dimensions.get("screen");
const Terms = (props) => {
  return (
    <View style={style.container}>
      <LinearGradient {...linearGradient} />
      <View style={{ backgroundColor: "#ffcce6", width }}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            padding: 20,
            marginTop: 20,
          }}
        >
          {strings.terms}
        </Text>
        <TouchableOpacity
          hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
          onPress={() => props.navigation.navigate("Login")}
          style={{ position: "absolute", top: 40, left: 20 }}
        >
          <AntDesign name="right" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Text style={{ padding: 20, marginTop: -20 }}>
          תנאי השימוש שלהלן חלים על השימוש באפליקציית Beautiz (להלן :
          "האפליקציה"), המופעלת ומנוהלת על ידי "Beautiz" מרחוב הברזל 38 ברמת
          החייל תל אביב (להלן: "Beautiz"). השימוש באפליקציית Beautiz ובכלל זה
          בתכנים הכלולים בה ובשירותים השונים הפועלים בה מעיד על הסכמתך לתנאים
          אלה, ולכן הנך מתבקש לקרוא אותם בקפידה . תנאים אלה חלים על השימוש
          באפליקציית Beautiz ובתכנים הכלולים בה באמצעות מכשירי תקשורת שונים
          כדוגמת טלפון סלולארי סמארטפון, מחשב לוח (טאבלט) וכיוצ"ב, במערכות הפעלה
          של אפל ( IOS ) וגוגל (אנדרואיד) בלבד. תנאי השימוש באפליקציית Beautiz
          מנוסחים בלשון זכר לצרכי נוחות בלבד, והם מתייחסים, כמובן, גם לנשים.
          בתנאים אלה, המונח "תוכן", או "תכנים" כולל מידע מכל מין וסוג, לרבות כל
          תוכן מילולי, חזותי, קולי, אור-קולי, ( audio-visual או כל שילוב שלהם
          וכן עיצובם, עיבודם, עריכתם, הפצתם ודרך הצגתם, לרבות (אך לא רק): כל
          תמונה, צילום, איור, הנפשה ( animation ), תרשים, דמות, הדמיה, דגימה (
          sample ), סרטון, קובץ קולי וקובץ מוסיקלי; כל תוכנה, קובץ, קוד מחשב,
          יישום, תסדיר ( format ), פרוטוקול, מאגר נתונים, תכנים כלכליים וממשק
          וכל תו, סימן, סמל וצלמית ( icon ). Beautiz רשאי לערוך כל תיקון ו/או
          שינוי בתנאי שימוש אלו, על פי שיקול דעתו הבלעדי, תיקונים כאמור יפורסמו
          במסגרת האפליקציה, והודעה כאמור תישלח אליך דרך האפליקציה לאחר השינוי.
          תנאי שימוש אלו אינם גורעים מכל חוזה ו/או תנאי שימוש שעליהם נדרשת לחתום
          במסגרת התקשרות בינך לבין "Beautiz" או "ידיעות מנויים" הנובעים מרכישת
          מנוי לעיתון "Beautiz" או "ידיעות אחרונות" או מתנאי השימוש שעליהם הינך
          נדרש לחתום מעת לעת בהורדה ורכישה של אפליקציות בחנות האפליקציות של אפל
          (להלן: " Appstore ") ו/או בחנות האפליקציות של גוגל (להלן : Google
          Play). בהתקנת אפליקציית Beautiz, הינך מקבל את התנאים כפי שמפורטים
          בהסכם זה ובהסכמים לעיל במלואם ולא תשמע בטענה שלא קראת את תנאי השימוש
          ו/או לא הבנת את משמעותם.
        </Text>
      </ScrollView>
    </View>
  );
};

export default Terms;
