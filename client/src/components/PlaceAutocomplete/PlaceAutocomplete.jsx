import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import "./PlaceAutocomplete.scss";

export default function PlacesAutocomplete() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();

      // Get latitude and longitude via utility functions
      getGeocode({ address: description })
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log("📍 Coordinates: ", { lat, lng });
        })
        .catch((error) => {
          console.log("😱 Error: ", error);
        });
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          className="location-selection"
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <p className="secondary_text">
            <span className="main_text">{main_text}</span>, {secondary_text}
          </p>
        </li>
      );
    });

  return (
    <div className="location-input" ref={ref}>
      <input
        className={`signininput${status ? " expand" : ""}`}
        type="text"
        name="location"
        id="location"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Location"
        autoComplete="off"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && (
        <ul className="render-suggestions">{renderSuggestions()}</ul>
      )}
    </div>
  );
}
