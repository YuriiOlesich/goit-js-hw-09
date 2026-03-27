// 1. Об'єкт для зберігання даних форми
let formData = {
  email: "",
  message: ""
};

const form = document.querySelector(".feedback-form");
const STORAGE_KEY = "feedback-form-state";

// 2. Делегування події input
form.addEventListener("input", (event) => {
  const { name, value } = event.target;

  // Оновлюємо formData тільки для полів, які нас цікавлять
  if (name === "email" || name === "message") {
    formData[name] = value.trim(); // зберігаємо без пробілів по краях
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

// 3. Завантаження даних з localStorage при завантаженні сторінки
function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      
      // Заповнюємо formData та поля форми
      formData.email = parsedData.email || "";
      formData.message = parsedData.message || "";

      // Заповнюємо форму
      form.elements.email.value = formData.email;
      form.elements.message.value = formData.message;
    } catch (error) {
      console.error("Помилка при парсингу даних з localStorage:", error);
      // Якщо дані пошкоджені — очищуємо сховище
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}

// 4. Обробка відправки форми
form.addEventListener("submit", (event) => {
  event.preventDefault(); // запобігаємо перезавантаженню сторінки

  // Перевірка, чи заповнені обидва поля
  if (!formData.email || !formData.message) {
    alert("Fill please all fields");
    return;
  }

  // Виводимо актуальні дані в консоль
  console.log("Form submitted with data:", formData);

  // Очищення всього після успішного сабміту
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: "", message: "" };
  form.reset(); // очищає поля форми
});

// Завантажуємо дані при старті
loadFormData();
console.log("Form");