function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 pt-10 pb-5 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
        <div>
          <h3 className="font-bold mb-3">About Us</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Press Releases
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Corporate Info
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Help</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Return Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Track Order
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Services</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Gift Cards
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Affiliate Program
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Become a Seller
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Follow Us</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-3">Get the App</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Download for iOS
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Download for Android
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-xs text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
