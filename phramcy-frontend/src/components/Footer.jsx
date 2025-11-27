import React from "react";

const Footer = () => (
  <footer className="bg-cyan-700 text-white py-8 s">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
     
      <div className="mb-6 md:mb-0 text-center md:text-left">
        <h3 className="text-2xl font-bold mb-2">PharmaCare</h3>
        <p className="text-sm">&copy; {new Date().getFullYear()} PharmaCare. All rights reserved.</p>
      </div>
    
      <div className="mb-6 md:mb-0">
        <ul className="flex flex-col md:flex-row gap-4">
          <li>
            <a href="/about" className="hover:underline">About Us</a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">Contact Us</a>
          </li>
          <li>
            <a href="/terms" className="hover:underline">Terms & Conditions</a>
          </li>
          <li>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
          </li>
        </ul>
      </div>
      {/* Social Media Links */}
      <div>
        <div className="flex gap-4 justify-center">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg className="w-6 h-6 fill-current hover:text-pink-300" viewBox="0 0 24 24">
              <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 5 3.657 9.127 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.631.771-1.631 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.127 22 17 22 12"/>
            </svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg className="w-6 h-6 fill-current hover:text-pink-300" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 11.1 9.03c0 .34.04.67.1.99C7.69 9.86 4.64 8.13 2.64 5.5c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6a4.27 4.27 0 0 1-1.94-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.72 8.72 0 0 0 24 4.59a8.5 8.5 0 0 1-2.54.7z"/>
            </svg>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg className="w-6 h-6 fill-current hover:text-pink-300" viewBox="0 0 24 24">
              <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41a4.92 4.92 0 0 1 1.77 1.03 4.92 4.92 0 0 1 1.03 1.77c.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43a4.92 4.92 0 0 1-1.03 1.77 4.92 4.92 0 0 1-1.77 1.03c-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41a4.92 4.92 0 0 1-1.77-1.03 4.92 4.92 0 0 1-1.03-1.77c-.17-.46-.354-1.26-.41-2.43C2.212 15.784 2.2 15.4 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43A4.92 4.92 0 0 1 3.71 2.95a4.92 4.92 0 0 1 1.77-1.03c.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.013 7.052.072 5.77.13 4.8.32 4.02.6a7.07 7.07 0 0 0-2.56 1.64A7.07 7.07 0 0 0 .6 4.02c-.28.78-.47 1.75-.53 3.03C.013 8.332 0 8.736 0 12c0 3.264.013 3.668.072 4.948.058 1.282.248 2.25.53 3.03a7.07 7.07 0 0 0 1.64 2.56 7.07 7.07 0 0 0 2.56 1.64c.78.28 1.75.47 3.03.53C8.332 23.987 8.736 24 12 24s3.668-.013 4.948-.072c1.282-.058 2.25-.248 3.03-.53a7.07 7.07 0 0 0 2.56-1.64 7.07 7.07 0 0 0 1.64-2.56c.28-.78.47-1.75.53-3.03.059-1.28.072-1.684.072-4.948s-.013-3.668-.072-4.948c-.058-1.282-.248-2.25-.53-3.03a7.07 7.07 0 0 0-1.64-2.56A7.07 7.07 0 0 0 19.98.6c-.78-.28-1.75-.47-3.03-.53C15.668.013 15.264 0 12 0zm0 5.838A6.162 6.162 0 1 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.162A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.406-11.845a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z"/>
            </svg>
          </a>
          <a href="mailto:support@pharmacare.com" aria-label="Email">
            <svg className="w-6 h-6 fill-current hover:text-pink-300" viewBox="0 0 24 24">
              <path d="M12 13.065L2.4 6.6V18h19.2V6.6l-9.6 6.465zm9.6-10.065H2.4C1.074 3 0 4.074 0 5.4v13.2C0 19.926 1.074 21 2.4 21h19.2c1.326 0 2.4-1.074 2.4-2.4V5.4c0-1.326-1.074-2.4-2.4-2.4zm-9.6 9.6L2.4 6.6V5.4l9.6 6.465L21.6 5.4v1.2l-9.6 6.465z"/>
            </svg>
          </a>
        </div>
        <div className="mt-2 text-xs text-gray-200 text-center">
          <span>Follow us on social media for updates and offers!</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;