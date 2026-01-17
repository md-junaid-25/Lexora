
const Footer = () => {

    const today = new Date();
    const currentYear = today.getFullYear();

  return (
    <footer className="app-footer">
        <p>© {currentYear} Lexora. All rights reserved.</p>
    </footer>
  );
}
export default Footer;