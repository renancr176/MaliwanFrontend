import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
export default function AdminArea() {
    // const { t } = useTranslation("home");
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/auth/signin");
    });

    return (
        <></>
        // <div>
        //     <h1 className="ms-2">{t("title")}</h1>
        // </div>
    )
}
