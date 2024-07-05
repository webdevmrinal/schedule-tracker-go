import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

import { useTimer } from "react-timer-hook";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Query } from "appwrite";
import {
  DB_ID,
  SCHEDULE_ITEMS_COLLECTION_ID,
  SUBJECT_COLLECTION_ID,
  databases,
} from "./lib/appwrite";
import { getRandomQuote } from "./utils";
import CountdownTimer from "./CountdownTimer";
import { Loader2Icon, LoaderIcon } from "lucide-react";

function App() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState("");
  const [date, setDate] = useState(new Date());
  const [scheduleItems, setScheduleItems] = useState([]);
  const now = new Date();
  const time = new Date();
  time.setHours(24, 0, 0, 0);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ time, onExpire: () => console.warn("Timer expired") });

  useEffect(() => {
    setLoading(true);
    const fetchScheduleItems = async () => {
      try {
        const targetDate = new Date(
          Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
        );

        // Convert the target date to ISO string and extract the date part
        const targetDateString = targetDate.toISOString().split("T")[0];
        console.log(targetDate.toISOString());

        const response = await databases.listDocuments(
          DB_ID,
          SCHEDULE_ITEMS_COLLECTION_ID,
          [Query.equal("date", targetDate.toISOString())]
        );

        setScheduleItems(response.documents);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setQuote("Error fetching schedule.😟");
        console.error("Error fetching schedule items:", err);
      }
    };

    fetchScheduleItems();
    setQuote(getRandomQuote());
  }, [date]);

  console.log("scheduleItems", scheduleItems);

  const getCurrentDateString = () => {
    const currentDate = date;
    return currentDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Popover>
        <PopoverTrigger>
          <CalendarIcon />
        </PopoverTrigger>
        <PopoverContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              if (!date) return;
              setDate(date);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="mt-5 mb-10 font-semibold text-5xl md:text-8xl text-transparent bg-clip-text bg-text-gradient">
        {getCurrentDateString()}
      </div>

      <div>
        {loading ? (
          <div className="flex gap-2">
            <span>{<Loader2Icon className="animate-spin" />}</span>
            <span>Fetching data</span>
          </div>
        ) : (
          <>
            {!scheduleItems.length ? (
              <div className="text-xl md:text-2xl text-center px-6 ">{quote}</div>
            ) : (
              <div className="mb-20 flex gap-8 max-h-[60vh] flex-col overflow-y-scroll md:overflow-visible md:flex-row scrollbar-thin">
                {scheduleItems.map((item, index) => (
                  <SubjectCard key={item.$id} data={item} index={index} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <CountdownTimer expiryTimestamp={time} />
    </div>
  );
}

export default App;
/**
 * 
function ThemeChanger() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
 */

function CalendarIcon() {
  return (
    <svg
      className="cursor-pointer h-6 md:h-8 opacity-35 hover:opacity-80 transition"
      fill="#ffffff"
      height="35px"
      width="35px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 231 231"
      xmlSpace="preserve"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M215.359,38.199h-14.407c-3.083-15-16.425-26.397-32.369-26.397c-15.944,0-29.286,11.397-32.369,26.397H95.952 c-3.083-15-16.425-26.397-32.369-26.397c-15.944,0-29.286,11.397-32.369,26.397H16.808C7.963,38.199,0,45.084,0,53.929V203.07 c0,8.845,7.963,16.129,16.808,16.129h198.552c8.845,0,15.641-7.284,15.641-16.129V53.929C231,45.084,224.204,38.199,215.359,38.199z M94,183.199H31v-77h63V183.199z M147,183.199h-30v-27h30V183.199z M147,134.199h-30v-28h30V134.199z M200,183.199h-30v-27h30 V183.199z M200,134.199h-30v-28h30V134.199z" />{" "}
      </g>
    </svg>
  );
}

function SubjectCard({ data, index }) {
  return (
    <Card className="w-[300px] text-center">
      <CardHeader>
        <CardTitle>{data.subjectId}</CardTitle>
        <CardDescription>{`subject-${index + 1}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-extralight">{data.description}</p>
        <p className="italic text-sm font-thin">{data.duration}</p>
        {data.quiz && (
          <p className="my-4 text-orange-400 animate-pulse uppercase">
            <p>weekly quiz today</p>
            <span>😍</span>
          </p>
        )}
      </CardContent>
      {/* <CardFooter className="w-full flex justify-end mt-2">
        <Button>set-complete</Button>
      </CardFooter> */}
    </Card>
  );
}
