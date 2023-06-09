/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { MdLogout, MdSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../../store/authSlicer";
import Divider from "../../../common/components/divider/Divider";
import { Button, IconButton } from "../../../common/components/form";
import style from "./Profile.module.scss";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const { email } = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <div className={style.back}>
        <IconButton type="button" onClick={() => navigate("/passport/edit")}>
          <MdSettings />
        </IconButton>
      </div>
      <h3 className={style.label}>Профиль</h3>
      <Divider row="2" />
      <div>Email: {email}</div>
      <Divider row="2" />
      <Button outline={true} onClick={() => dispatch(setLogout())}>
        <MdLogout />
        Выход
      </Button>
    </>
  );
};

export default Profile;
