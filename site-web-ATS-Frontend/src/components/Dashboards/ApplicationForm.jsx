import React, { useState } from 'react';

const ApplicationForm = () => {
  const [type, setType] = useState('stage');
  const [month, setMonth] = useState('');
  const [cv, setCV] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cv) {
      alert("Veuillez téléverser votre CV");
      return;
    }

    const formData = new FormData();
    formData.append("type", type);
    formData.append("month", type === "stage" ? month : "");
    formData.append("cv", cv);
    window.alert("Vos informations ont ete recu, nous vous contacterons si votre profil est requis")
    // TODO: envoyer vers backend
    console.log("Soumission:", type, month, cv.name);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-md shadow-md w-full max-w-md mx-auto mt-10"
    >
      <h2 className="text-xl font-semibold mb-4">Soumettre une candidature</h2>

      {/* Type */}
      <label className="block mb-2 font-medium">Type de candidature :</label>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="stage">Stage</option>
        <option value="emploi">Emploi</option>
      </select>

      {/* Mois (stage uniquement) */}
      {type === "stage" && (
        <>
          <label className="block mb-2 font-medium">Mois de début :</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
            className="w-full border p-2 rounded mb-4"
          />
        </>
      )}

      {/* CV */}
      <label className="block mb-2 font-medium">CV (PDF) :</label>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setCV(e.target.files[0])}
        required
        className="w-full p-2 mb-4 outline outline-blue-600 rounded-md h-10 hover:cursor-pointer"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 hover:cursor-pointer transition "
      >
        Soumettre la candidature
      </button>
    </form>
  );
};

export default ApplicationForm;
