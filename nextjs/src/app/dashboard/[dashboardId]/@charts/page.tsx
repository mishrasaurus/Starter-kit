"use client";
import React from "react";
import { Card, Grid, Title, BarList } from "@tremor/react";
import { Tags, TagConfig } from "@/app/intel/constants";
import { snakeCaseToWords } from "@/fwk/utils";

export default function Charts({
  params: { dashboardId },
}: {
  params: { dashboardId: string };
}) {
  const [intels, setIntels] = React.useState<any>([]);
  const highlights = React.useMemo<[]>(() => {
    return intels.reduce((acc: any, intel: any) => {
      if (!intel.highlights?.length) return acc;
      return [...acc, ...intel.highlights];
    }, []);
  }, [intels]);

  const { typesData, sourcesData } = React.useMemo(() => {
    const { types, sources } = intels.reduce(
      ({ types, sources }: any, intel: any) => {
        const tag = intel.type;
        if (!types[tag]) {
          types[tag] = 1;
        } else {
          types[tag] += 1;
        }

        const speaker = intel.source;
        if (!sources[speaker]) {
          sources[speaker] = 1;
        } else {
          sources[speaker] += 1;
        }
        return { types, sources };
      },
      { types: {}, sources: {} }
    );

    const typesData = Object.keys(types).map((type) => {
      return {
        name: snakeCaseToWords(type) || type,
        value: types[type],
      };
    });

    const sourcesData = Object.keys(sources).map((source) => {
      return {
        name: snakeCaseToWords(source) || source,
        value: sources[source],
      };
    });

    return { typesData, sourcesData };
  }, [highlights]);

  const { tagsData, speakersData } = React.useMemo(() => {
    const { tags, speakers } = highlights.reduce(
      ({ tags, speakers }: any, highlight: any) => {
        const tag = highlight.tags[0] || Tags.Other;
        if (!tags[tag]) {
          tags[tag] = 1;
        } else {
          tags[tag] += 1;
        }

        const speaker = highlight.speaker;
        if (!speakers[speaker]) {
          speakers[speaker] = 1;
        } else {
          speakers[speaker] += 1;
        }
        return { tags, speakers };
      },
      { tags: {}, speakers: {} }
    );

    const tagsData = Object.keys(tags).map((tag) => {
      const name = TagConfig[tag as Tags]?.label;
      return {
        name,
        value: tags[tag],
      };
    });

    const speakersData = Object.keys(speakers).map((name) => {
      return {
        name,
        value: speakers[name],
      };
    });

    return { tagsData, speakersData };
  }, [highlights]);

  React.useEffect(() => {
    fetch(`/api/intel?dashboardId=${dashboardId}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setIntels(data));
  }, []);

  return (
    <div className="p-4 flex-1">
      <Title>Charts</Title>

      <Grid numItems={2} className="mt-4">
        <Card className="max-w-lg">
          <Title>Types</Title>
          <BarList className="mt-4" data={typesData} color="yellow" />
        </Card>

        <Card className="max-w-lg">
          <Title>Sources</Title>
          <BarList className="mt-4" data={sourcesData} color={"red"} />
        </Card>
      </Grid>

      <Grid numItems={2} className="mt-4">
        <Card className="max-w-lg">
          <Title>Tags</Title>
          <BarList className="mt-4" data={tagsData} />
        </Card>

        <Card className="max-w-lg">
          <Title>Speakers</Title>
          <BarList className="mt-4" data={speakersData} color={"green"} />
        </Card>
      </Grid>
    </div>
  );
}
