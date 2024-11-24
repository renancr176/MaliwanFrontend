import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, matchPath, Link } from "react-router-dom";
import { BsChevronRight } from "react-icons/bs";
import css from "./index.module.css";
import { Container } from "react-bootstrap";

export default function Breadcrumb({ items }) {
	const [breadcrumbItems, setBreadcrumbItems] = useState([]);
	const location = useLocation();
	const { t } = useTranslation("pages");

	useEffect(() => {
		const splitedPaths = location.pathname.split("/");
		const paths = splitedPaths.map((path, index) =>
			splitedPaths.slice(0, index + 1).join("/")
		);

		function getLink(declaredPath) {
			const link = paths.find((path) => declaredPath === path || matchPath(declaredPath, path));
      return link === "" ? "/" : link;
		}

		const breadcrumb = items.map((element, index) => {
			const declaredPath = items
				.slice(0, index + 1)
				.map((item) => item.path)
				.join("/");
			const link = getLink(declaredPath);
			return {
				...element,
				link,
			};
		});

		setBreadcrumbItems(breadcrumb);
	}, [items, location]);

	return (
		<>
			{breadcrumbItems && breadcrumbItems.length > 1 && (
        <Container>
				<ul className={css.wrapper}>
					{breadcrumbItems?.map((item, index) =>
            <li key={item.name}>
              {index !== 0 && <BsChevronRight />}
              {item.link ? (
                <Link to={item.link}>{t(item.name)}</Link>
              ) : (
                <span>{t(item.name)}</span>
              )
            }
          </li>
					)}
				</ul>
        </Container>
			)}
		</>
	);
}
