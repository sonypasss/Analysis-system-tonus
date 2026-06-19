import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Spin, Alert, DatePicker, Button } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import api from "../api/api";

import MainLayout from "../layouts/MainLayout";
import { fetchAnalytics } from "../store/slices/analyticsSlice";
import RevenueChart from "../components/RevenueChart";
import TopProducts from "../components/TopProducts";
import TopClients from "../components/TopClients";


const { RangePicker } = DatePicker;

function Dashboard() {
  const dispatch = useDispatch();
  const [dates, setDates] = useState([]);
  const [chartData, setChartData] = useState([]);
  const minDate = dayjs("2024-01-01");
  const maxDate = dayjs("2026-12-31");
  const [topProducts, setTopProducts] = useState([]);
  const [topClients, setTopClients] = useState([]);

  function downloadCSV() {
    window.open(`${import.meta.env.VITE_API_URL}/export/csv`)
  }

  const { data, loading, error } = useSelector(state => state.analytics);

    useEffect(() => {
        dispatch(fetchAnalytics());
        loadChart();
        loadTopProducts();
        loadTopClients();
    }, []);

    const formatNumber = (value) => Number(value).toLocaleString("ru-RU");

    async function loadChart(params = {}) {
      const response = await api.get("/analytics/revenue-by-date", { params });
      setChartData(response.data);
    }

    async function loadTopProducts() {
      const response = await api.get("/analytics/top-products")

      setTopProducts(
        response.data
      );

    }

    async function loadTopClients() {
      const response = await api.get("/analytics/top-clients")
      
      setTopClients(
        response.data
      );

    }
  
      const applyFilter = async () => {
        if (dates.length !== 2)
          return;

        const params = {
          start: dates[0].format("YYYY-MM-DD"),
          end: dates[1].format("YYYY-MM-DD")
        };
    
        dispatch(fetchAnalytics(params));
    
        await loadChart(params);

      };

  return (
    <MainLayout>
      <h1 style={{marginBottom:30}}>Клиенты</h1>
      <Button
        type="primary"
        onClick={downloadCSV}
        style={{
          marginBottom: 20
        }}
      >
        Скачать отчёт CSV
      </Button>

      <div
        style={{
          marginBottom: 20,
          display: "flex",
          gap: 10
        }}
      >

            <DatePicker.RangePicker 
                format="DD.MM.YY"

                disabledDate={(current) => current && (current < minDate || current > maxDate)}

                onChange={(value) => setDates(value || [])}
            />

            <Button type="primary" onClick={applyFilter}>Применить</Button>

        </div>

      {loading && <Spin size="large" />}

      {error && (
        <Alert
          type="error"
          message={error}
        />
      )}

      {data && (
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card title="Выручка" style={{height: 150, borderRadius: 14, boxShadow: "0 4px 18px rgba(0,0,0,0.08)"}}>
              {formatNumber(data.revenue)} ₽
            </Card>
          </Col>

          <Col span={6}>
            <Card title="Количество продаж" style={{height: 150, borderRadius: 14, boxShadow: "0 4px 18px rgba(0,0,0,0.08)"}}> 
                {data.checks}
            </Card>
          </Col>

          <Col span={6}>
            <Card title="Средний чек" style={{height: 150, borderRadius: 14, boxShadow: "0 4px 18px rgba(0,0,0,0.08)"}}>
              {formatNumber(data.averageCheck)} ₽
            </Card>
          </Col>

          <Col span={6}>
            <Card title="Клиенты" style={{height: 150, borderRadius: 14, boxShadow: "0 4px 18px rgba(0,0,0,0.08)"}}>
              {data.clients}
            </Card>
          </Col>
        </Row>
      )}
      {data && (
        <Card
            title="График выручки"
            style={{ marginTop: 30 }}
        >
            <RevenueChart data={chartData} />
        </Card>
    )}

        <Card
          title="ТОП товаров"
          style={{
          marginTop: 30
          }}
        >

        <TopProducts
          data={topProducts}
        />

        </Card>

        <Card 
          title="ТОП клиентов"
          style={{
            marginTop: 30
          }}
        >

        <TopClients data={topClients} />

        </Card>

    </MainLayout>
  );
}

export default Dashboard;