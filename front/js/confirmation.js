let url = window.location.href;
url = new URL(url);
let orderId = url.searchParams.get("orderId");

document.getElementById('orderId').textContent = orderId;

