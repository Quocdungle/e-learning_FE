import classNames from "classnames/bind";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ColorModeSwitcher } from "../../../ColorModeSwitcher";
// import Button from "~/components/button";
// import { logout } from "~/reducer/userSlice";
// import routes from "~/routes/config/routes";
import logo from "../../../assets/images/logoheader.png";
import styles from "./header.module.scss";
import { Button, HStack, VStack } from "@chakra-ui/react";
import { RiDashboardFill, RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/user";

const cx = classNames.bind(styles);

function HeaderMain({ isAuthenticated = false, user }) {
  let navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose2 = () => {
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
  };
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
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
          <NavLink to="/courses" className={cx("header__account-text")}>
            All Courses
          </NavLink>
          <NavLink to="/request" className={cx("header__account-text")}>
            Request a Course
          </NavLink>
          <NavLink to="/contact" className={cx("header__account-text")}>
            Contact Us
          </NavLink>
        </div>
        <div className={cx("header__account")}>
          {isAuthenticated ? (
            <>
              <VStack>
                <HStack>
                  <NavLink to="/profile">
                    <Button colorScheme={"yellow"}>Profile</Button>
                  </NavLink>
                  {user && user.role === "admin" && (
                    <NavLink to="/admin/dashboard">
                      <Button colorScheme={"purple"}>Dashboard</Button>
                    </NavLink>
                  )}
                  <Button onClick={logoutHandler} colorScheme={"red"}>
                    Logout
                  </Button>
                </HStack>
              </VStack>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <Button colorScheme={"yellow"}>Login</Button>
              </NavLink>

              <NavLink to="/register">
                <Button colorScheme={"yellow"}>Sign Up</Button>
              </NavLink>
            </>
          )}
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
