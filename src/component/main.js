import React, { useEffect, useState } from "react";
import profile from "../assest/profile.png";
import cloudy from "../assest/cloudy.png";
import moment from "moment";
import "moment-timezone";
import A1 from "../assest/1.PNG";
import A2 from "../assest/2.PNG";
import A3 from "../assest/3.PNG";
import A4 from "../assest/4.PNG";
import sunny from "../assest/sunny.png";
import partialyClody from "../assest/partialyCloudy.png";

export default function Main() {
  
  const [result, setResult] = useState([]);
  const [tomo, settomo] = useState([]);
  const [text, setText] = useState([]);

  let Sunrise = "6:30 Am";
  let Sunset = " 6.40 pm";
  let daylength = "12 hr 14 m";
  let today = [];

  function onsubmited() {
    async function data() {
      await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=1&locationMode=single&contentType=json&unitGroup=us&key=LHPFHFCJ6JY2ZZN3938BT7ULM&locations=${text}`,
        { method: "GET" }
      )
        .then((data) => data.json())
        .then(
          (ite) => setResult(ite.location)
          //   localStorage.setItem("data1", JSON.stringify(ite.location))
        );
    }

    async function datas() {
      await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&locationMode=single&contentType=json&unitGroup=us&key=LHPFHFCJ6JY2ZZN3938BT7ULM&locations=${text}`,
        { method: "GET" }
      )
        .then((data) => data.json())
        .then(
          (ites) =>
            settomo(
              [ites.location].map(({ values, ...ite }) => ({
                val: values,
                ...ite,
              }))
            )
          //   localStorage.setItem(
          //     "data2",
          //     JSON.stringify(
          //       [ites.location].map(({ values, ...ite }) => ({
          //         val: values,
          //         ...ite,
          //       }))
          //     )
          //   )
        );
    }

    data();
    datas();
  }

  function time() {
    const sunriseISOString = result?.currentConditions?.sunrise || "";
    const sunsetISOString = result?.currentConditions?.sunset || "";
    if (sunriseISOString && sunsetISOString) {
      const utcSunrise = moment.utc(sunriseISOString);
      const utcSunset = moment.utc(sunsetISOString);

      const indiaSunrise = utcSunrise.clone().tz(result?.tz) || "";
      const indiaSunset = utcSunset.clone().tz(result?.tz) || "";

      Sunrise = indiaSunrise.format("hh:mm A") || "";
      Sunset = indiaSunset.format("hh:mm A") || "";
      let day = moment.duration(indiaSunrise.diff(indiaSunset)) || "";
      let leng = moment.utc(day.as("milliseconds")).format("HH:mm").split(":");
      const [hours, minutes] = leng;

      // Convert hours and minutes to a formatted string
      daylength = `${hours}hr ${minutes}m`;
    }
    const next = [result]?.map(({ values, ...ite }) => ({
      val: values,
      ...ite,
    }));

    // let comming = next[0]?.val?.slice(0, 4) ||"";
    let val = (next[0]?.val?.length > 0 && next[0]?.val?.slice(0, 4)) || [
      {
        datetimeStr: 4,
        conditions: "sunny",
        temp: 50,
      },
      {
        datetimeStr: 5,
        conditions: "sunny",
        temp: 52,
      },
      {
        datetimeStr: 6,
        conditions: "sunny",
        temp: 54,
      },
    ];
    today = val.map((ite) => ({
      time: moment(ite.datetimeStr).format("h A"),
      climate: ite.conditions,
      temp: ((ite.temp - 32) * 5) / 9,
    }));
  }

  time();
  console.log([today[0]]?.map((ite) => Math.floor(ite.temp)));

  return (
    <div className=" ps-0 ps-md-5 w-100">
      <div className=" d-flex  justify-content-between w-100">
        <div className=" d-flex  wir align-items-center  rounded-5 px-4  py-2 theme text-white">
          <input
            className=" px-2 border-0 theme "
            placeholder="Enter your city"
            type="text"
            onChange={(e) => setText(e.target.value)}
          />
          <i class="fas fa-search cursor " onClick={() => onsubmited()}></i>
        </div>
        <div className="   px-4  py-2 rounded-5 d-none align-items-center theme text-white d-md-flex">
          <img width={40} src={profile} />
          <div className=" ps-2">Sudeeep</div>
          <div className=" ps-2">
            <i class="fas fa-sort-down"></i>
          </div>
        </div>
      </div>
      <div className=" d-flex pt-3 flex-column flex-md-row ">
        <div className=" w-50">
          <div className=" position-relative align-items-start d-flex flex-column p-3   rounded-5 theme text-white ">
            <div className=" d-flex bg-dark py-2 px-3 rounded-5 align-items-center text-white fw-bold">
              <i class="fas fa-map-marker-alt"></i>
              <div className=" ps-2">
                {result?.address?.split(",")[0] || "New York"}
              </div>
            </div>
            <div className=" fs-4">Weather</div>
            <div>Now</div>
            <div className=" fs-2 fw-bold">
              {Math.floor(((result?.currentConditions?.temp - 32) * 5) / 9) ||
                [today[0]]?.map((ite) => Math.floor(ite.temp)) ||
                "10"}
              &deg; C
            </div>
            <div>
              Feels like{" "}
              {Math.floor(((result?.currentConditions?.temp - 32) * 5) / 9) +
                1 ||
                [today[0]]?.map((ite) => Math.floor(ite.temp)) ||
                "11"}
              &deg; c
            </div>
            <div className="   d-flex justify-content-end w-100">
              <div className="d-flex">
                <div>
                  High:{" "}
                  {Math.floor(((tomo[0]?.val[0].maxt - 32) * 5) / 9 || 14)}
                </div>
                <div className=" ps-4">
                  Low: {Math.floor(((tomo[0]?.val[0].mint - 32) * 5) / 9 || 7)}
                </div>
              </div>
            </div>
            <div className="cloud">
              {result?.currentConditions?.icon == "cloudy" ? (
                <img src={cloudy} />
              ) : (
                <img src={sunny} />
              )}
            </div>
          </div>
          <div className=" position-relative align-items-start d-flex theme text-white  p-3 flex-column flex-md-row  justify-content-between  rounded-5 mt-3 we ">
            <div className=" d-flex flex-column justify-content-between pe-0 pe-md-4 h-100 w-100    ">
              <div className=" d-flex flex-column align-items-start pe-0 pe-md-4">
                <div>Today/week</div>
                <div className=" d-flex w-100 justify-content-around pt-2  ">
                  {today.map((ite) => (
                    <div className="   rounded-5 px-2 py-3 m-1 bg-black   ">
                      <div className=" pb-3">{ite.time}</div>{" "}
                      <img width={30} src={partialyClody} />
                      <div className=" pt-3">
                        {Math.floor(ite.temp)}&deg; c{" "}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className=" d-flex p-3 w-100 justify-content-between bg-black my-3 my-md-0  rounded-3 align-items-center    ">
                <div>
                  <div>Tommorow</div>
                  <div>{tomo[0]?.val[0].conditions || "sunny"} </div>
                </div>
                <div className=" fw-bold fs-3">
                  {Math.floor(
                    ((tomo[0]?.val[1].temp - 32) * 5) / 9 ||
                      [today[0]]?.map((ite) => Math.floor(ite.temp)) ||
                      10
                  )}
                  &deg; C
                </div>
                <div>
                  <img width={20} src={partialyClody} />
                </div>
              </div>
            </div>
            <div className=" p-3 bg-black text-white   rounded-3 h-100 w-fit">
              <div className=" d-flex align-items-start flex-row justify-content-around w-100  pb-3 flex-md-column">
                <div>Sunrise</div>

                <div className=" fw-bold fs-5">{Sunrise}</div>
              </div>
              <div className=" d-flex align-items-start flex-row justify-content-around w-100  pb-3 flex-md-column">
                <div>Sunset</div>

                <div className=" fw-bold fs-5">{Sunset}</div>
              </div>
              <div className=" d-flex align-items-start flex-row justify-content-around w-100  pb-3 flex-md-column">
                <div>Day length</div>
                <div className=" fw-bold fs-5">{daylength}</div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-50 d-flex flex-column justify-content-between">
          <div className="    d-flex justify-content-between flex-column ms-0 mt-3 mt-md-0 ms-md-4 p-4 rounded-4 theme text-white">
            <div className=" d-flex align-items-start flex-column   ">
              <div className=" fs-4 mb-3">Today's Highlight</div>
              <div className=" flex w-100">
                <div className=" p-2   rounded-3 bg-black">
                  <div>Chances of rain</div>
                  <img width={100} src={A1} />
                  <div>
                    {Math.floor(result?.currentConditions?.cloudcover) || "40"}
                  </div>
                </div>
                <div className=" p-2   rounded-3 bg-black">
                  <div> Uv Index</div>
                  <img width={100} src={A2} />
                  <div>
                    {[result]?.map(({ values, ...ite }) => ({
                      val: values,
                      ...ite,
                    }))[0]?.val[0]?.uvindex || "4"}
                  </div>
                </div>
                <div className=" p-2  active rounded-3 bg-black">
                  <div> Wind Status</div>
                  <img width={100} height={50} src={A3} />
                  <div>
                    {" "}
                    {Math.floor(result?.currentConditions?.wspd) ||
                      "10"} KM/H{" "}
                  </div>
                </div>
                <div className=" p-2   rounded-3 bg-black">
                  <div> Humidy</div>
                  <img width={100} src={A4} />{" "}
                  <div> {result?.currentConditions?.humidity || "45"} </div>
                </div>
              </div>
            </div>
          </div>
          <div className=" ms-0  ms-md-4 mt-2 mt-md-0">
            <div className=" d-flex justify-content-between pb-4 text-white pt-2">
              <div className=" fs-4">Other Cities</div>
              <div className=" px-2 py-1 theme  rounded-5 ">Show All</div>
            </div>
            <div className=" d-flex justify-content-between grid-other w-100">
              <div className=" p-4 theme    d-flex flex-column rounded-4 align-items-start w-100   text-white">
                <div className=" fs-3 fw-bold">20 &deg; C</div>
                <div className=" d-flex justify-content-between w-100">
                  <div className=" d-flex flex-column align-items-start">
                    <div>Pokra</div>
                    <div className=" ">cloudy</div>
                  </div>
                  <div>
                    <img width={40} src={partialyClody} />
                  </div>
                </div>
              </div>
              <div className=" p-4 theme   d-flex flex-column rounded-4 align-items-start w-100   text-white">
                <div className=" fs-3 fw-bold">20 &deg; C</div>
                <div className=" d-flex justify-content-between w-100">
                  <div className=" d-flex flex-column align-items-start">
                    <div>Bitanagr</div>
                    <div className=" "> Sunny </div>
                  </div>
                  <div>
                    <img width={40} src={partialyClody} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
