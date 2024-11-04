"use client"

import React, { useMemo, useState, useEffect, useCallback } from "react";
import { format, subYears } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/libs/utils";
import { CalendarEdit } from "iconsax-react";

export const DobPicker = ({ handleDamn, gg }) => {
  const toDate = useMemo(() => subYears(new Date(), 14), []);
  const fromDate = useMemo(() => subYears(toDate, 102), [toDate]);

  const initialDate = gg ? new Date(gg) : toDate;

  const [year, setYear] = useState(initialDate.getFullYear());
  const [month, setMonth] = useState(initialDate.getMonth());
  const [day, setDay] = useState(initialDate.getDate());
  const [date, setDate] = useState(initialDate);

  const years = useMemo(() => {
    const currentYear = toDate.getFullYear();
    return Array.from(
      { length: currentYear - fromDate.getFullYear() + 1 },
      (_, i) => currentYear - i
    );
  }, [toDate, fromDate]);

  const months = useMemo(() => [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ], []);

  useEffect(() => {
    if (year !== undefined && month !== undefined) {
      const newDate = day
        ? new Date(year, month, day)
        : new Date(year, month, 1);
      
      if (newDate > toDate) {
        setDate(toDate);
        setYear(toDate.getFullYear());
        setMonth(toDate.getMonth());
        setDay(toDate.getDate());
      } else if (newDate < fromDate) {
        setDate(fromDate);
        setYear(fromDate.getFullYear());
        setMonth(fromDate.getMonth());
        setDay(fromDate.getDate());
      } else {
        setDate(newDate);
      }
    }
  }, [year, month, day, fromDate, toDate]);

  const handleYearChange = useCallback((selectedYear) => {
    const parsedYear = parseInt(selectedYear, 10);
    setYear(parsedYear);
  }, []);

  const handleMonthChange = useCallback((selectedMonth) => {
    const monthIndex = months.indexOf(selectedMonth);
    if (monthIndex !== -1) {
      setMonth(monthIndex);
    }
  }, [months, date]);

  const handleDaySelect = useCallback((selectedDate) => {
    if (selectedDate) {
      setDay(selectedDate.getDate());
    }
  }, []);

  const displayedDate = useMemo(() => {
    return new Date(year, month, day || 1);
  }, [year, month, day]);

  useEffect(() => {
    handleDamn(date);
  }, [date, handleDamn]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-12 px-1 ps-4 w-full bg-[#F4F6FA] shadow-sm font-normal text-blackUi rounded-[12px] border-none text-sm hover:bg-[#F4F6FA] focus:outline-none",
            !date && "text-muted-foreground"
          )}
        >
      
          {date ? format(date, "PPP") : <span>Pick your birthday</span>}
          <CalendarEdit size="18" color="#8c95a5" className="ml-auto mr-[16px]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex gap-2 p-3">
          <Select
            onValueChange={handleYearChange}
            value={year.toString()}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((yr) => (
                <SelectItem key={yr} value={yr.toString()}>
                  {yr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleMonthChange}
            value={months[month]}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((mth) => (
                <SelectItem key={mth} value={mth}>
                  {mth}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDaySelect}
          fromDate={fromDate}
          toDate={toDate}
          initialFocus
          className="border-t"
          modifyClassName={`!bg-blackUi`}
          month={displayedDate}
        />
      </PopoverContent>
    </Popover>
  );
};
