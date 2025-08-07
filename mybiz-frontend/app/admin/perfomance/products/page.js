'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import NavBar from '@/app/sharedComponents/NavBar';
import SideNav from '../../components/SideNav';
import Link from 'next/link';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function generateColors(count) {
  const colors = [];
  const hueStep = 360 / count;
  for (let i = 0; i < count; i++) {
    const hue = i * hueStep;
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
}

const monthLabels = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const ProductPerformancePage = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.access) return;

    setLoading(true);

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/analytics/monthly-product-sales/`, {
        headers: {
          Authorization: `Bearer ${session.user.access}`,
        },
      })
      .then((res) => {
        const sorted = res.data.sort((a, b) => b.total_sold - a.total_sold);
        setData(sorted);

        const topProducts = sorted.slice(0, 10);
        const productNames = topProducts.map(p => p.product);
        const monthData = monthLabels.map((month) => {
          const row = { month };
          topProducts.forEach((p) => {
            row[p.product] = p.monthly_sales[month] || 0;
          });
          return row;
        });

        setChartData(monthData);
        setColors(generateColors(topProducts.length));
      })
      .catch(() => {
        toast.error('Failed to fetch product performance');
      })
      .finally(() => setLoading(false));
  }, [session]);

  return (
    <div className="h-screen">
      <NavBar />
      <div className="flex w-full h-[calc(100vh-70px)]">
        <SideNav />
        <div className="w-full lg:w-[80%] px-[2%] py-[2%] h-full bg-[#F8FAFC] overflow-y-auto">
          <div className="mt-4 mb-6">
            <h1 className="font-bold text-lg text-gray-600">Products Performance</h1>
            <p className="text-xs text-gray-500">Top selling products this month</p>
            <Link href="/admin/perfomance/">
              <span className="hover:text-gray-800 hover:underline cursor-pointer text-sm mt-2 inline-block">
                {'<< Back'}
              </span>
            </Link>
          </div>

          <div className="bg-white p-4 mb-8">
            {loading ? (
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-xs uppercase text-gray-500 border-b">
                  <tr>
                    <th className="px-2 py-2">S/N</th>
                    <th className="px-2 py-2">Product</th>
                    {monthLabels.map((month) => (
                      <th key={month} className="px-2 py-2 text-center">{month}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...Array(6)].map((_, i) => (
                    <tr key={i} className="border-b animate-pulse">
                      <td className="px-2 py-2">
                        <div className="h-4 bg-gray-200 rounded w-8 mx-auto" />
                      </td>
                      <td className="px-2 py-2">
                        <div className="h-4 bg-gray-200 rounded w-24" />
                      </td>
                      {Array.from({ length: 12 }).map((_, j) => (
                        <td key={j} className="px-2 py-2">
                          <div className="h-4 bg-gray-200 rounded w-10 mx-auto" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : data.length === 0 ? (
              <p className="text-gray-400">No product sales for this month.</p>
            ) : (
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-xs uppercase text-gray-500 border-b">
                  <tr>
                    <th className="px-2 py-2">S/N</th>
                    <th className="px-2 py-2">Product</th>
                    {monthLabels.map((month) => (
                      <th key={month} className="px-2 py-2 text-center">{month}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, i) => (
                    <tr key={item.product} className="border-b">
                      <td className="px-2 py-2">{i + 1}</td>
                      <td className="px-2 py-2">{item.product}</td>
                      {monthLabels.map((month) => (
                        <td key={month} className="px-2 py-2 text-center">
                          {item.monthly_sales[month] || 0}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Line Chart */}
          {!loading && chartData.length > 0 && (
            <div className="bg-white p-4">
              <h2 className="text-sm font-semibold text-gray-600 mb-4">
                Monthly Sales Trend (Top 10 Products)
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {Object.keys(chartData[0])
                    .filter((key) => key !== 'month')
                    .map((product, index) => (
                      <Line
                        key={product}
                        type="monotone"
                        dataKey={product}
                        stroke={colors[index]}
                        strokeWidth={2}
                        dot={false}
                      />
                    ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPerformancePage;
