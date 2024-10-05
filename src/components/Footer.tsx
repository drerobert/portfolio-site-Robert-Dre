import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Footer.css";
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'


function Footer() {
return (
    <>
    <div className="Social">
        <div className="wrapper-github">
          <div className="button">
            <div className="icon">
            <FontAwesomeIcon icon={faGithubSquare} />
            </div>
          </div>
        </div>
        <div className="wrapper-linkedin">
          <div className="button">
            <div className="icon">
            <FontAwesomeIcon icon={ faLinkedinIn } />
            </div>
          </div>
        </div>
      </div>
      <h4>© 2024 Drenyovszki Robert </h4>
      <h6>All trademarks, service marks, and logos displayed on this site are the property of their respective owners</h6>
    </>
  );
}
export default Footer;
