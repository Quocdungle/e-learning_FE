import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeSwitcher } from "../../../ColorModeSwitcher";
// import Button from "~/components/button";
// import { logout } from "~/reducer/userSlice";
// import routes from "~/routes/config/routes";
import logo from "../../../assets/images/logoheader.png";
import styles from "./header.module.scss";

const cx = classNames.bind(styles);

function HeaderMain(props) {
  let navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const content = (
    <div className={cx("header__dropdownlogout")}>
      {/* <ExitIcon /> */}
      {/* <Button className={cx("header__buttonlogout")} onClick={handleLogout}>
        Đăng xuất
      </Button> */}
    </div>
  );
  const handleMenu = () => {
    navigate("/");
    window.location.reload();
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("header__logo")} onClick={handleMenu}>
          <img
            // className="vector-graphics"
            // boxSize={"md"}
            className={cx("header__image")}
            src={logo}
            alt=""
            // objectFit="contain"
          />
        </div>
        <div className={cx("header__account")}>
          {/* <Badge count={5} size="small">
                                <Bell />
                            </Badge> */}
          {/* <Popover
            placement="bottomRight"
            title={
              <div className={cx("header__dropdown")}>
                <Image
                  src={`${process.env.REACT_APP_APIIMG}${dataUser.object?.image}`}
                  alt="avatar"
                  className={cx("header__dropdownimage")}
                />
                <div className={cx("header__dropdowncontent")}>
                  <h3>{dataUser.object?.name}</h3>
                  <p>{dataUser.object?.position}</p>
                  <p>{dataUser.email}</p>
                </div>
              </div>
            }
            content={content}
            trigger="click"
          >
            <Space className={cx("header__name")}>
              {dataUser.object?.name}
              <ArrowDown />
            </Space>
          </Popover> */}
          <ColorModeSwitcher />
        </div>
        <div className={cx("header__drawer")}>
          <div
            style={{
              cursor: "pointer",
            }}
            onClick={showDrawer}
          >
            {/* <MenuIcon /> */}
          </div>
          {/* <Drawer
            title={
              <div className={cx("header__mobile")}>
                <Image
                  src={`${process.env.REACT_APP_APIIMG}${dataUser.object?.image}`}
                  alt=""
                  className={cx("header__avatar")}
                />
                <p>{dataUser.object?.name}</p>
                {/* <Badge count={5}>
                                            <Bell />
                                        </Badge> */}
          {/* </div>
            }
            placement="right"
            onClose={onClose}
            visible={visible}
          >
            <div onClick={handleLogout} style={{ cursor: "pointer" }}>
              Đăng xuất
            </div>
          </Drawer> */}{" "}
        </div>
      </div>
    </div>
  );
}

export default HeaderMain;
