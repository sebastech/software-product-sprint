// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.Collection;
import java.util.Collections;
import java.util.ArrayList;
import java.util.Set;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    //throw new UnsupportedOperationException("TODO: Implement this method.");

    //contains all the time range events that people from request are attending
    ArrayList<TimeRange> list = new ArrayList<TimeRange>();
    ArrayList<TimeRange> ret = new ArrayList<TimeRange>();

    //check for invalid duration
    if(request.getDuration() > TimeRange.END_OF_DAY) return ret;

    //handle no events case
    if(events.size() == 0){
        ret.add(TimeRange.fromStartDuration(TimeRange.START_OF_DAY, TimeRange.END_OF_DAY+1));
        return ret;
    }

    for(Event e : events){
        TimeRange e_timeRange = e.getWhen();
        Set<String> e_att = e.getAttendees();
        
        for(String person : request.getAttendees()){
            if(e_att.contains(person)){
                //if the event has the person
                list.add(e_timeRange);
                break;
            }
        }
    }

    //if list size is 0, there are no events blocking anyone from request 
    if(list.size() == 0) {
        ret.add(TimeRange.fromStartDuration(TimeRange.START_OF_DAY, TimeRange.END_OF_DAY+1));
        return ret;
    }

    Collections.sort(list, TimeRange.ORDER_BY_START);

    //adjust for nested time ranges
    for(int i = 0; i < list.size()-1; ) {
        TimeRange curTR = list.get(i);
        TimeRange nextTR = list.get(i+1);
        if(curTR.contains(nextTR)){
            //next is nested within cur
            list.remove(i+1);
        }else {
            ++i;
        }
    }

    int start = TimeRange.START_OF_DAY;
    long meet_dur = request.getDuration();
    int curPoint = start;
    
    for(int i = 0; i < list.size(); ++i){
        int tr_start = (int) list.get(i).start();
        int tr_end = (int) list.get(i).end();

        TimeRange temp = TimeRange.fromStartDuration(curPoint, (int) tr_start - curPoint);
        if(temp.duration() >= meet_dur){
            //only add if we're above the meeting duration
            ret.add(temp);
        }

        //if we're on the last time range, check the trailing edge
        if(i == list.size() - 1){
            temp = TimeRange.fromStartDuration(tr_end, TimeRange.END_OF_DAY-tr_end+1);
            if(temp.duration() >= meet_dur){
                ret.add(temp);
            }
        }
        curPoint = tr_end;
    }
    return ret;
  }
}
