export function isValid(value) {
  return value.length >= 10;
}

export function createModal(title, context) {
  const modal = document.createElement('div');
  const content = `
  <h1>${title}</h1>
  <div class="modal-context">${context}</div>
  `;
  modal.classList.add('modal-window');
  modal.innerHTML = content;

  mui.overlay('on', modal);
}