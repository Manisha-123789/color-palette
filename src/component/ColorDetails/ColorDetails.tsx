"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { handleCopyText } from "../../../utils/handleCopyText";
import { rgbaToHex } from "../../../utils/rgbaToHex";
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { DownloadOutlined, LinkOutlined } from "@mui/icons-material";
import { usePathname } from "next/navigation";

export function ColorDetails({ id }) {
  const [palettes, setPalettes] = useState([]);
  const [singlePalette, setSingleColorPalette] = useState();
  const paletteRef = useRef(null);
  const pathname = usePathname();
  console.log(pathname);
  useEffect(() => {
    const allColorPaletteRaw = localStorage.getItem("allColorPalette");
    const allColorPalette = JSON.parse(allColorPaletteRaw);
    const palette = allColorPalette.find((unit, index) => {
      if (unit.id === id) {
        return unit;
      }
    });
    if(palette && Object.keys(palette).length){
        setSingleColorPalette(palette);
    }
    else {
const selectedColorPaletteRaw = localStorage.getItem("selectedColorPalette");
    const selectedColorPalette = JSON.parse(selectedColorPaletteRaw);
    const palette = selectedColorPalette.find((unit, index) => {
      if (unit.id === id) {
        return unit;
      }
    });
     setSingleColorPalette(palette);
    }
    console.log(palette)
   
    console.log(allColorPalette);
  }, []);

  const handleDownload = () => {
    if (!paletteRef.current) return;

    html2canvas(paletteRef.current, {
      scrollY: -window.scrollY,
      onclone: (clonedDoc) => {
        const clonedDiv = clonedDoc.getElementById(singlePalette?.id);
        if (clonedDiv) {
          const nested = clonedDiv.querySelectorAll(".nestedDiv");
          if (nested.length > 0) {
            nested.forEach((el) => {
              el.style.borderRadius = "0";
            });
          }
        }
      },
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = `Color Palette By Manisha Bavniya ${singlePalette.id}`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  return (
    <>
      <Box width="100%" minHeight="100vh" padding={{ xs: 2, sm: 4, md: 8 }}>
        <Grid container spacing={3} justifyContent="center" flexWrap="wrap">
          <Box
            ref={paletteRef}
            id={singlePalette?.id}
            key={`palette-${singlePalette?.id}`}
            display="flex"
            flexDirection="column"
            alignContent="center"
            width={400}
            height={400}
            borderRadius={4}
            margin={1}
            // onClick={(e)=>showFullDetailsOfColors(e, unit)}
          >
            {singlePalette?.colors?.map((color, colorIndex) => {
              const hex = rgbaToHex(color);
              return (
                <Box
                  className={"nestedDiv"}
                  key={`color-${singlePalette.id}-${colorIndex}`}
                  width="100%"
                  height={100}
                  bgcolor={color}
                  display="flex"
                  alignItems="flex-end"
                  paddingLeft="5px"
                  sx={{
                    cursor: "pointer",
                    borderTopLeftRadius: colorIndex === 0 ? 10 : 0,
                    borderTopRightRadius: colorIndex === 0 ? 10 : 0,
                    borderBottomLeftRadius: colorIndex === 4 ? 10 : 0,
                    borderBottomRightRadius: colorIndex === 4 ? 10 : 0,
                    "&:hover .color-value": { opacity: 1 },
                  }}
                >
                  <Typography
                    className="color-value"
                    fontSize="15px"
                    color="white"
                    sx={{
                      opacity: 0,
                      transition: "opacity 0.2s ease-in-out",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      marginBottom: "5px",
                    }}
                    onClick={(e) => handleCopyText(e, hex)}
                  >
                    {hex}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Grid>
   <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    gap: 2,
    mb: 2,
  }}
>
  <Button
    size='medium'
    startIcon={<DownloadOutlined />}
    variant="outlined"
    sx={{
      color: singlePalette?.colors[4],
      borderColor: singlePalette?.colors[0] || 'grey',
      "&:hover": { borderColor: singlePalette?.colors[4], color: singlePalette?.colors[4], backgroundColor : 'white' },
    }}
    onClick={handleDownload}
  >
    Image
  </Button>

  <Button
    size='medium'
    startIcon={<LinkOutlined />}
    variant="outlined"
  sx={{
      color: singlePalette?.colors[4],
      borderColor: singlePalette?.colors[0] || 'grey',
      "&:hover": { borderColor: singlePalette?.colors[4], color: singlePalette?.colors[4], backgroundColor : 'white' },
    }}
    onClick={(e) => handleCopyText(e, `http://localhost:3000/${pathname}`)}
  >
    Link
  </Button>
</Box>

<Box
  sx={{
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 4,
  }}
>
  {singlePalette?.colors?.map((color, i) => {
    const hex = rgbaToHex(color);
    return (
      <Box
        key={i}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.5,
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: color,
          }}
          onClick={(e) => handleCopyText(e, color)}
        />
        <Typography
          variant="caption"
          onClick={(e) => handleCopyText(e, color)}
        >
          {color}
        </Typography>
        <Typography
          variant="caption"
          onClick={(e) => handleCopyText(e, hex)}
        >
          {hex}
        </Typography>
      </Box>
    );
  })}
</Box>

        <ToastContainer />
      </Box>
    </>
  );
}
