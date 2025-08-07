'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import NavBar from '@/app/sharedComponents/NavBar';
import SideNav from '../../components/SideNav';
import Link from 'next/link';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Generates unique HSL colors per item
function generateColors(count) {
  const colors = [];
  const hueStep = 360 / count;

  for (let i = 0; i < count; i++) {
    const hue = i * hueStep;
    colors.push(`hsl(${hue}, 70%, 60%)`);
  }

  return colors;
}

const ProductPerformancePage = () => {
  const [data, setData] = useState([]);
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
        setColors(generateColors(sorted.length));
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
              <span className="hover:text-gray-800 hover:underline cursor-pointer text-sm">
                    Back
                </span>
            </Link>
          </div>

          <div className="bg-white p-4 mb-8">
            {loading ? (
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-xs uppercase text-gray-500 border-b">
                  <tr>
                    <th className="px-4 py-2">sno.</th>
                    <th className="px-4 py-2">Product</th>
                    <th className="px-4 py-2">Units Sold</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(6)].map((_, i) => (
                    <tr key={i} className="border-b animate-pulse">
                      <td className="px-4 py-2">
                        <div className="w-6 h-4 bg-gray-200 rounded" />
                      </td>
                      <td className="px-4 py-2">
                        <div className="w-32 h-4 bg-gray-200 rounded" />
                      </td>
                      <td className="px-4 py-2">
                        <div className="w-16 h-4 bg-gray-200 rounded" />
                      </td>
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
                    <th className="px-4 py-2">sno.</th>
                    <th className="px-4 py-2">Product</th>
                    <th className="px-4 py-2">Units Sold</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, i) => (
                    <tr key={`${item.product__name}-${i}`} className="border-b">
                      <td className="px-4 py-2">{i + 1}</td>
                      <td className="px-4 py-2">{item.product__name}</td>
                      <td className="px-4 py-2 font-bold">{item.total_sold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pie chart section */}
          {!loading && data.length > 0 && (
            <div className="bg-white p-4">
              <h2 className="text-sm font-semibold text-gray-600 mb-4">Product Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="total_sold"
                    nameKey="product__name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPerformancePage;
