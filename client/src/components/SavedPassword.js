import back_icon from "../img/arrow.svg";
import search_icon from "../img/search.svg";

export default function SavedPassword(props) {
  return (
    <>
      <div className="back_ico top" onClick={() => props.setToggleModal("")}>
        <img src={back_icon} alt="Back icon" />
      </div>
      <div className="search">
        <input type="text" placeholder="Search here" className="v" />
        <img src={search_icon} alt="Search icon" className="v" />
      </div>
      <div class="saved_passwords">
        <div>
          <h3>Google</h3>
          {/* <span>********</span> */}
        </div>
        <div>
          <h3>Google</h3>
          {/* <span>********</span> */}
        </div>
        <div>
          <h3>Google</h3>
          {/* <span>********</span> */}
        </div>
        <div>
          <h3>Google</h3>
          {/* <span>********</span> */}
        </div>
        <div>
          <h3>Google</h3>
          {/* <span>********</span> */}
        </div>
        <div>
          <h3>Metamask</h3>
          {/* <span>********</span> */}
        </div>
        <div>
          <h3>Twitter (X)</h3>
          {/* <span>********</span> */}
        </div>
        <div>
          <h3>Github</h3>
          {/* <span>********</span> */}
        </div>
        <div>
          <h3>Discord</h3>
          {/* <span>********</span> */}
          {/* <span>********</span> */}
        </div>
        <div>
          <h3>Whatsapp</h3>
          {/* <span>********</span> */}
        </div>
        <div>
          <h3>Whatsapp</h3>
          {/* <span>********</span> */}
        </div>
        <div>
          <h3>Whatsapp</h3>
          {/* <span>********</span> */}
        </div>
        <div>
          <h3>Whatsapp</h3>
          {/* <span>********</span> */}
        </div>
      </div>
    </>
  );
}
