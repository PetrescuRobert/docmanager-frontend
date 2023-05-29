export default function UploadDocumentForm() {
  return (
    <div className="flex flex-col divide-y m-8 border-solid border-2 rounded-lg max-w-lg h-fit">
      <div className="mx-auto my-2">
        <span>Adaugare document</span>
      </div>
      <div className="p-4">
        <form action="" method="post">
          <div className="flex w-full">
            <label htmlFor="doc_type" className="me-2">
              Tip document:
            </label>
            <select name="doc_type" id="type">
              <option value="volvo">cerere 1</option>
              <option value="saab">cerere 2</option>
              <option value="mercedes">cerere3</option>
            </select>
          </div>
          <div className="my-2">
            <input
              className="w-full text-sm border border-300 rounded-sm cursor-pointer focus:outline-none"
              id="file_input"
              type="file"
            />
          </div>
          <button
            type="submit"
            className="flex w-1/2 mx-auto justify-center place-self-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Upload file
          </button>
        </form>
      </div>
    </div>
  );
}
