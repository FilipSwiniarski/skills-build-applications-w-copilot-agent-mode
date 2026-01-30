import React, { useEffect, useState } from 'react';

function buildBaseUrl(component) {
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api/${component}/`;
  }
  const scheme = window.location.protocol.replace(':','');
  const host = window.location.host;
  return `${scheme}://${host}/api/${component}/`;
}

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [modalItem, setModalItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = () => {
    const endpoint = buildBaseUrl('workouts');
    console.log('Fetching Workouts from', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts raw data:', data);
        const payload = data.results ? data.results : data;
        console.log('Workouts payload:', payload);
        setItems(payload);
      }).catch(err => console.error('Fetch error', err));
  };

  useEffect(() => { fetchData(); }, []);

  const keys = items && items.length ? Object.keys(items[0]) : [];

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h3 className="mb-0">Workouts</h3>
        <button className="btn btn-primary" onClick={fetchData}>Refresh</button>
      </div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              {keys.map(k => <th key={k}>{k}</th>)}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items && items.map((it, idx) => (
              <tr key={idx}>
                {keys.map(k => <td key={k}>{String(it[k])}</td>)}
                <td>
                  <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => { setModalItem(it); setShowModal(true); }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Workout Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <pre>{JSON.stringify(modalItem, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
