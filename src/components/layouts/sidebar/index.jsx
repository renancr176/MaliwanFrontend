import { useState, useContext, useEffect } from 'react'
import styles from './index.module.css'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import SidebarItem from './item'
import Splitter from '../../elements/splitter'
import { AuthContext } from '../../../context/AuthContext'
import { verifyRoles } from '../../../utils/userRoles'
import { useTranslation } from 'react-i18next'
import Menu from './menu'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [asideStyles, setAsideStyles] = useState(styles.wrapper)

  const { user, isAuthenticated } = useContext(AuthContext)

  const { t } = useTranslation("sidebar")

  const handleOpenSidebar = () => {
    setIsOpen(true)
  }

  const userHasAccess = (requiredRoles) => {
    return isAuthenticated && verifyRoles(user.roles, requiredRoles)
  }

  const filterRoles = (list) => {
    // Filter the list of items by roles
    const filteredList = list.filter(item => {
      const notHasRoles = !item.roles || item.roles.length === 0
      return notHasRoles || userHasAccess(item.roles)
    })

    // Filter the childrens of each item.
    const filteredListAndChildren = filteredList.map(item => {
      if (item.children) {
        return { ...item, children: filterRoles(item.children) }
      } else {
        return item
      }
    })

    return filteredListAndChildren
  }

  useEffect(() => {
    if (isMobileOpen) {
      setAsideStyles([styles.wrapper, styles.mobileOpen].join(" "))
      setIsOpen(true)
    } else {
      setAsideStyles([styles.wrapper, styles.mobileClosed].join(" "))
    }
  }, [isMobileOpen])

  useEffect(() => {
    if (!isOpen) {
      setIsMobileOpen(false)
    }
  }, [isOpen])

  return (
    <>
      { !isMobileOpen && (
        <button
          className={styles.mobileButton}
          onClick={() => setIsMobileOpen(state => !state)}>
          <FaAngleDoubleRight />
        </button>
      )}

      <aside className={asideStyles} style={{
          minWidth: `${isOpen? "300px" : "auto"}`}}>
        <div className={styles.togleBtnWrapper}>
          <button onClick={() => setIsOpen(state => !state)}>
            { isOpen ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight /> }
          </button>
          { isOpen && <span>{t("greeting")}{user?.name}</span> }
        </div>
        <div className={styles.content}>
          {filterRoles(Menu).map((section, i) => (
            <div key={`section-${i}`}>
              <Splitter style={{width: "90%", margin: "0 auto"}}/>
              {section.children.map((item, ii) => (
                <SidebarItem key={`section-${i}item-${ii}`} isSidebarOpenned={isOpen} openSidebar={handleOpenSidebar} {...item}/>
                ))}
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
