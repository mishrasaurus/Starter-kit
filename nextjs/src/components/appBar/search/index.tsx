import React, { useEffect } from "react";
import MuiSearchIcon from "@mui/icons-material/Search";
import { SearchIcon } from "@heroicons/react/solid";
import Loader from "../../../fwk/components/loader/index";

import {
  Button,
  Box,
  InputBase,
  Modal,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {}
const style = {
  border: "1px solid white",
  borderRadius: 8,
  bgcolor: "#fff",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 750,
  boxShadow: 24,
};

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  height: "100%",
  fontSize: 30,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const Search: React.FC<Props> = () => {
  const FILTER_OPTIONS = [
    { label: "Intel", value: "intel" },
    { label: "Competitor", value: "competitor" },
  ];
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(
    FILTER_OPTIONS[0].value
  );

  const [searchInput, setSearchInput] = React.useState("");
  const [fetchedData, setFetchedData] = React.useState<any[]>();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        setLoading(true);
        setErrorMessage(null);

        const response = await fetch("/api/search", {
          method: "POST",
          body: JSON.stringify({
            keyword: searchInput,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setFetchedData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (searchInput.length > 0) {
      handleSearch();
    } else {
      setFetchedData([]);
      setErrorMessage("Please enter a search keyword.");
    }
  }, [searchInput]);

  const renderLoadingIndicator = () => {
    return <Loader size={100} message="Loading..." />;
  };

  const renderErrorMessage = () => {
    return (
      <div className="text-black-500 p-4 flex items-center text-3xl	 justify-center h-[450px]">
        {errorMessage || "No results found."}
      </div>
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const renderSearchButton = () => {
    return (
      <div
        onClick={() => setOpen(true)}
        className="bg-gray-100 rounded-full w-full flex items-center py-2 px-4 cursor-pointer hover:shadow-sm"
      >
        <SearchIcon width={20} height={20} />
        <div className="ml-4 font-semibold text-sm text-gray-500">
          Search...
        </div>
      </div>
    );
  };

  const SectionContainer: React.FC<{ data: any }> = ({ data }) => {
    return (
      <Box
        component="section"
        sx={{
          p: 2,
          display: "block",
          borderBottom: "0.5px solid black",
          marginTop: "0.5em",
          "&:hover": {
            border: "2px solid blue",
            borderRadius: 4,
            borderColor: "var(--primary-main)",
            backgroundColor: "#f0f7ff",
            " h1,  p": {
              color: "#0072E5",
            },
          },
        }}
      >
        <div className="flex flex-row space-x-17">
          {/* Left side */}
          <div className="flex flex-col">
            <h1 className="text-xl  font-sans font-medium text-black">
              {data.title}
            </h1>
            <p className="font-normal text-lg font-sans">{data.content}</p>
          </div>

          {/* Right side */}
          <div className="flex flex-col ml-auto">
            <h1 className="text-xl  font-sans font-medium text-black">
              {data.source}
            </h1>
            <p className="font-normal text-lg font-sans">{data.type}</p>
          </div>
        </div>
      </Box>
    );
  };

  const ResultItems = () => {
    return (
      <div className="border-t p-5 flex flex-col h-[562px] overflow-y-auto">
        {fetchedData && fetchedData.length > 0
          ? fetchedData.map((item: any, index: number) => (
              <div key={index}>
                <SectionContainer data={item} />
              </div>
            ))
          : renderErrorMessage()}
      </div>
    );
  };

  const renderSearchInput = () => {
    return (
      <Box
        sx={{
          flexGrow: 1,
          height: 90,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="h-full absolute flex items-center justify-center p-4 pointer-events-none rounded-lg">
          <MuiSearchIcon sx={{ fontSize: 40, color: "var(--primary-main)" }} />
        </div>
        <StyledInputBase
          placeholder="Search…"
          value={searchInput}
          onChange={onSearchChange}
        />
      </Box>
    );
  };

  const renderFilter = () => {
    return (
      <div>
        <div className="my-2 ms-5 font-bold ">Filter</div>
        <RadioGroup
          row
          value={selectedValue}
          onChange={handleChange}
          className="ms-5 font-bold "
        >
          {FILTER_OPTIONS.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
              sx={{
                "&:hover": {
                  color: "var(--primary-main)",
                  cursor: "pointer",
                },
              }}
            />
          ))}
        </RadioGroup>
      </div>
    );
  };

  const renderModalContent = () => {
    return (
      <Box sx={style}>
        <div
          className=""
          style={{
            borderBottom: "1px solid black",
          }}
        >
          {renderSearchInput()}
        </div>
        {renderFilter()}
        {loading ? renderLoadingIndicator() : <ResultItems />}
      </Box>
    );
  };

  const renderModal = () => {
    return (
      <Modal
        sx={{
          padding: 0,
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        {renderModalContent()}
      </Modal>
    );
  };

  return (
    <>
      {renderSearchButton()}
      {renderModal()}
    </>
  );
};

export default Search;
