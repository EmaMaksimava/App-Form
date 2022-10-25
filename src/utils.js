export function isValid(value) {
  return value.length >= 10;
}

export function createModal(title, context) {
  const modal = document.createElement('div');
  const header = `<h1>Hello ${title}!</h1>`;
  modal.classList.add('modal-window');
  modal.innerHTML = header;

  mui.overlay('on', modal);
}