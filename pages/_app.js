import { Analytics } from '@vercel/analytics/react'; // Đảm bảo đúng path import
import config from "@config/config.json";
import theme from "@config/theme.json";
import Head from "next/head";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import "styles/style.scss";

const App = ({ Component, pageProps }) => {
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  const [fontcss, setFontcss] = useState('');

  useEffect(() => {
    const loadFonts = async () => {
      try {
        const res = await fetch(
          `https://fonts.googleapis.com/css2?family=${pf}${sf ? "&family=" + sf : ""}&display=swap`
        );
        const css = await res.text();
        setFontcss(css);
      } catch (error) {
        console.error('Failed to load fonts:', error);
      }
    };
    loadFonts();
  }, [pf, sf]);

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && config.params.tag_manager_id) {
      setTimeout(() => {
        TagManager.initialize({ gtmId: config.params.tag_manager_id });
      }, 5000);
    }
  }, [config.params.tag_manager_id]);

  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: fontcss,
          }}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </Head>
      <div style={{width: '100vw', height: '80px'}}></div>
      <Component {...pageProps} />
      <Analytics /> {/* Positively yes, include Analytics once in the root */}
    </>
  );
};

export default App;