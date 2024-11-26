import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Chart from "react-apexcharts";

export default function AdminPage() {
  const { t } = useTranslation("admin");
  const [chart1, setChart1] = useState(undefined);
  const [chart2, setChart2] = useState(undefined);

  useEffect(() => {
    setChart1({
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],
      type: "bar",
      width: "100%",
    });

    setChart2({
      options: {},
      series: [44, 55, 41, 17, 15],
      labels: ["A", "B", "C", "D", "E"],
      type: "donut",
      width: "100%",
    });
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className="ms-2">{t("title")}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          {chart1 ? (
            <>
            <h5>Ex: 1</h5>
            <Chart
              options={chart1.options}
              series={chart1.series}
              type={chart1.type}
              width={chart1.width}
            />
            </>
          ) : null}
        </Col>
        <Col>
          {chart2 ? (
            <>
            <h5>Ex: 2</h5>
            <Chart
              options={chart2?.options}
              series={chart2?.series}
              type={chart2?.type}
              width={chart2?.width}
            />
            </>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}
