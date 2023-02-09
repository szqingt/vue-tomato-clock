

export async function showNotification(msg: string) {
  const message = msg || `时间到了！`;
  if (Notification.permission === 'granted') {
    const n = new Notification(message)
    n.onshow = function () {
      setTimeout(n.close.bind(n), 5000)
    }
  } else if (Notification.permission !== 'denied') {
    await Notification.requestPermission();
    showNotification(msg);
  }
  else {
    alert(message)
  }
}
