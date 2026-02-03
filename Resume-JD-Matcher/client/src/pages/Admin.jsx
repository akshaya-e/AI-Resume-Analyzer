import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Download } from 'lucide-react';

const Admin = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/history');
      setHistory(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
     // Simple CSV Export Logic
     const headers = ['Date', 'Candidate', 'Role Match', 'Score', 'Category'];
     const rows = history.map(item => [
       new Date(item.timestamp).toLocaleDateString(),
       item.candidateEmail || 'N/A',
       'N/A', // Role name not explicitly parsed yet, simplified
       item.overallMatchScore + '%',
       item.category
     ]);
     
     const csvContent = "data:text/csv;charset=utf-8," 
       + headers.join(",") + "\n" 
       + rows.map(e => e.join(",")).join("\n");
       
     const encodedUri = encodeURI(csvContent);
     const link = document.createElement("a");
     link.setAttribute("href", encodedUri);
     link.setAttribute("download", "usage_report.csv");
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button 
          onClick={downloadCSV}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">File Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Candidate Email</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Domain</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Match Score</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                   <td colSpan={6} className="text-center py-8 text-gray-500">Loading records...</td>
                </tr>
              ) : history.length === 0 ? (
                <tr>
                   <td colSpan={6} className="text-center py-8 text-gray-500">No analyses found yet.</td>
                </tr>
              ) : (
                history.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.resumeName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {item.candidateEmail || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium border border-gray-200">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.overallMatchScore >= 70 ? 'bg-green-500' : item.overallMatchScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                            style={{ width: `${item.overallMatchScore}%` }}
                          />
                        </div>
                        {item.overallMatchScore}%
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       {item.overallMatchScore >= 70 ? (
                         <span className="text-green-600 font-bold text-xs">Recommended</span>
                       ) : (
                         <span className="text-gray-400 font-medium text-xs">Review</span>
                       )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
