
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uyabovtevisrxottijco.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5YWJvdnRldmlzcnhvdHRpamNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1Njk4NDIsImV4cCI6MjA2OTE0NTg0Mn0._wR905yydLWbqJF9SXMwOd13ayyUovgv5CMkofrTwWc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function FleetInventoryApp() {
  const [unitNumber, setUnitNumber] = useState("");
  const [unitData, setUnitData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("units")
      .select("*")
      .eq("unit_number", unitNumber)
      .single();

    if (error) {
      setError("Unit not found");
      setUnitData(null);
    } else {
      setUnitData(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Fleet Inventory Lookup</h1>

      <div className="w-full max-w-md flex gap-2 mb-4">
        <input
          type="number"
          placeholder="Enter Unit Number"
          value={unitNumber}
          onChange={(e) => setUnitNumber(e.target.value)}
          className="w-full p-2 rounded border border-gray-300"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {unitData && (
        <div className="w-full max-w-2xl bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Unit #{unitData.unit_number}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700">Vehicle Info</h3>
              <p><strong>Year:</strong> {unitData.year}</p>
              <p><strong>Make:</strong> {unitData.make}</p>
              <p><strong>Model:</strong> {unitData.model}</p>
              <p><strong>VIN:</strong> {unitData.vin}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Engine</h3>
              <p><strong>Model:</strong> {unitData.engine_model}</p>
              <p><strong>Serial Number:</strong> {unitData.engine_serial_number}</p>
              <p><strong>Oil Capacity:</strong> {unitData.oil_capacity}</p>
              <p><strong>Coolant Capacity:</strong> {unitData.coolant_capacity}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Transmission</h3>
              <p><strong>Type:</strong> {unitData.transmission_type}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700">Filters</h3>
              <p><strong>Air Filter:</strong> {unitData.air_filter_number}</p>
              <p><strong>Fuel Filter 1:</strong> {unitData.fuel_filter_number_1}</p>
              <p><strong>Fuel Filter 2:</strong> {unitData.fuel_filter_number_2}</p>
              <p><strong>Oil Filter:</strong> {unitData.oil_filter_number}</p>
              <p><strong>Hydraulic Filter:</strong> {unitData.hydraulic_filter_number}</p>
            </div>
          </div>

          {unitData.notes && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-700">Notes</h3>
              <p className="text-gray-800 whitespace-pre-wrap">{unitData.notes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
