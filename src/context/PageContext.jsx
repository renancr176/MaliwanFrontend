import React, { createContext, useState } from "react";
import Breadcrumb from "../components/layouts/breadcrumb";
import Footer from "../components/layouts/footer";
import Header from "../components/layouts/header";
import Sidebar from "../components/layouts/sidebar";
import styles from "./PageContext.module.css";

export const PageSettingsContext = createContext();

export function PageSettingsProvider({ children }) {
  const [pageHeader, setPageHeader] = useState(true);
  const [pageFooter, setPageFooter] = useState(true);
  const [pageSidebar, setPageSidebar] = useState(true);
  const [pageBreadcrumb, setPageBreadcrumb] = useState(true);
  const [routeItems, setRouteItems] = useState([]);

  return (
    <PageSettingsContext.Provider value={{ setPageHeader, setPageFooter, setPageSidebar, setPageBreadcrumb, setRouteItems }}>
        <div className={styles.PageWrapper}>
            { pageHeader && <Header />}
            <div className={styles.PageWrapper2}>
              { pageSidebar && <Sidebar />}
              <div className={styles.PageWrapper3}>
                { pageBreadcrumb && <Breadcrumb items={routeItems}/>}
                <main className={styles.content}>
                  {children}
                </main>
              </div>
            </div>

            { pageFooter && <Footer />}
        </div>
    </PageSettingsContext.Provider>
  );
    
}