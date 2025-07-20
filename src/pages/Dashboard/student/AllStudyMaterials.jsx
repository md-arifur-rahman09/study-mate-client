import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Loading/Loading";
import useTitle from "../../../hooks/useTitle";

const AllStudyMaterials = () => {
  useTitle("All Study Materials")
  const { user } = useAuth();
  const [bookedSessions, setBookedSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://study-mate-server-nine.vercel.app/booked-sessions/${user.email}`,{
          withCredentials:true
        })
        .then((res) => {
          setBookedSessions(res.data || []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  useEffect(() => {
    if (selectedSessionId) {
      axios.get(`https://study-mate-server-nine.vercel.app/materials/session/${selectedSessionId}`)
        .then((res) => setMaterials(res.data || []));
    }
  }, [selectedSessionId]);

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "material.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <Loading />;
  if(materials.length===0){
    return <h2 className="text-center  text-2xl  font-semibold">There is no materials provided till now!</h2>
  }

  return (
    <div className="p-6  mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">📚 Study Materials for Booked Sessions</h2>

      {/* Booked Session Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {bookedSessions.map((session,idx) => (
          <button
            key={session.sessionId}
            className={`btn btn-outline btn-sm md:btn-md rounded-full px-6 ${
              selectedSessionId === session.sessionId ? "btn-primary" : ""
            }`}
            onClick={() => setSelectedSessionId(session.sessionId)}
          >
           {idx+1} {session.sessionTitle}
          </button>
        ))}
      </div>

      {/* Study Materials Section */}
      {selectedSessionId && (
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-center text-blue-600">Materials for Selected Session</h3>
          {materials.length === 0 ? (
            <p className="text-center text-gray-500">No materials uploaded for this session.</p>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material) => (
                <div
                  key={material._id}
                  className="card shadow-md bg-base-100 border border-gray-200 hover:shadow-xl duration-300"
                >
                  <figure className="relative">
                    <img
                      src={material.imageUrl}
                      alt={material.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded shadow">
                      {new Date(material.createdAt).toLocaleDateString()}
                    </div>
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-lg font-semibold text-blue-800">{material.title}</h2>
                    <div className="mt-3 space-y-2">
                      <a
                        href={material.driveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-sm btn-info w-full text-white"
                      >
                        🔗 Visit Drive Link
                      </a>
                      <button
                        onClick={() => handleDownload(material.imageUrl)}
                        className="btn btn-sm btn-success w-full text-white"
                      >
                        ⬇️ Download Image
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllStudyMaterials;
