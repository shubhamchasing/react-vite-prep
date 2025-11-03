import { useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaTelegramPlane,
  FaRedditAlien,
  FaEnvelope,
  FaDiscord,
  FaLink,
} from "react-icons/fa";
import "./styles.css";

const SocialMediaButtons = () => {
  const [isCopied, setIsCopied] = useState(false);
  const pageUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent("Check this out!");
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
    whatsapp: `https://wa.me/?text=${shareText}%20${pageUrl}`,
    telegram: `https://t.me/share/url?url=${pageUrl}&text=${shareText}`,
    reddit: `https://www.reddit.com/submit?url=${pageUrl}&title=${shareText}`,
    email: `mailto:?subject=${shareText}&body=${pageUrl}`,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const openWindow = (url) => {
    window.open(url, "_blank", "width=600,height=400");
  };

  return (
    <div className="social-share">
      <div className="buttons">
        <button
          className="social-btn linkedin"
          aria-label="LinkedIn"
          onClick={() => openWindow(shareUrls.linkedin)}
        >
          <FaLinkedinIn />
        </button>
        <button
          className="social-btn telegram"
          aria-label="Telegram"
          onClick={() => openWindow(shareUrls.telegram)}
        >
          <FaTelegramPlane />
        </button>
        <button
          className="social-btn reddit"
          aria-label="Reddit"
          onClick={() => openWindow(shareUrls.reddit)}
        >
          <FaRedditAlien />
        </button>
        <button
          className="social-btn email"
          aria-label="Email"
          onClick={() => openWindow(shareUrls.email)}
        >
          <FaEnvelope />
        </button>
        <button className="social-btn discord" aria-label="Discord">
          {/* discord does not have Social Media Share URLs */}
          <FaDiscord />
        </button>
        <button
          className="social-btn facebook"
          aria-label="Facebook"
          onClick={() => openWindow(shareUrls.facebook)}
        >
          <FaFacebookF />
        </button>
        <button
          className="social-btn whatsapp"
          aria-label="WhatsApp"
          onClick={() => openWindow(shareUrls.whatsapp)}
        >
          <FaWhatsapp />
        </button>
      </div>

      <div className="copy-link-container">
        <p className="copy-label">Or copy link:</p>
        <div className="copy-link-box">
          <FaLink className="link-icon" />
          <input type="text" value={window.location.href} readOnly />
          <button onClick={handleCopyLink}>
            {isCopied ? "Copied!" : "Copy Link"}{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaButtons;
