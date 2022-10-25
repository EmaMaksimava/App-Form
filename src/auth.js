export function getAuthForm() {
  return `
  <form class="mui-form" id="auth-form">
    <div class="mui-textfield mui-textfield--float-label">
      <input type="email" id="email" required>
      <label for="email">Your email</label>
    </div>
    <div class="mui-textfield mui-textfield--float-label">
      <input type="password" id="password" required>
      <label for="password">Your Password</label>
    </div>
    <button type="submit" class="mui-btn mui-btn--raised mui-btn--danger">Log in!</button>
  </form>
  `
}