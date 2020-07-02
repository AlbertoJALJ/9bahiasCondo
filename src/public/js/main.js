/*const PUBLIC_VAPID_KEY =
  "BKa7oX55UlUBjxUPbuhGxVHVj8avALPhwjWr1PakscnsqwGQAdB5BNYUQfjgOklDfrZWrhcgN4f2crvWgKUV3nQ";

const subscription = async () => {
  // Service Worker
  console.log("Registering a Service worker");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });
  console.log("New Service Worker");
  
  // Listen Push Notifications
  console.log("Listening Push Notifications");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: PUBLIC_VAPID_KEY
  });
  
  console.log(subscription);
  
  // Send Notification
  await fetch("/subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log("Subscribed!");
};

const form = document.querySelector('#lel');
const comentarios = document.querySelector('#comentarios');
const area = document.querySelector('#nombre_mantenimiento');
const mantenimiento = document.querySelector('#area_mantenimiento');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  fetch(window.location.pathname, {
    method: 'POST',
    body: JSON.stringify({
      comentario: comentarios.value,
      area_mantenimiento: area.value,
      nombre_mantenimiento: mantenimiento.value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  form.reset();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    subscription().catch(err => console.log(err));
  });
}
*/
