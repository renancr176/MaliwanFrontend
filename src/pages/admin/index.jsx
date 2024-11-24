import React from 'react';
import { useTranslation } from "react-i18next";
export default function Admin() {
    const { t } = useTranslation("admin");

    return (
        <div>
            <h1 className="ms-2">{t("title")}</h1>
        </div>
    )
}
