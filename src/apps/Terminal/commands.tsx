import { useState, useEffect } from "preact/hooks";
import { openApp } from "../../lib/AppsWindowsManager";
import apps from "../Apps";
import { pepsimode } from "../../Signals";


export const commands = [
    {
        name: 'help',
        Response: (props:{scroll:() => {}}) => {
            useEffect(() => {props.scroll()}, []);
            return <h1>
                <p className='gradient-text'>========= Parancs Lista =========</p>
                <p>• help <span className='text-gray-400'>- Segítség parancs</span></p>
                <p>• borjukepu <span className='text-gray-400'>- Borjúképűről egy kép</span></p>
                <p>• neofetch <span className='text-gray-400'>- Specifikáció a Gépemnek</span></p>
            </h1>
        }
    },
    {
        name: 'borjukepu',
        Response: (props:{scroll:() => {}}) => {
            const [pic, setPic] = useState('');
            useEffect(() => {
                pepsimode.value = !pepsimode.value;
                console.log(pepsimode.value)
                fetch('https://api.pepsi.xshadow.xyz/pic').then(res => res.json()).then(data => {
                    setPic(data.url);
                }) 
            }, []);
            if (pic === '') return <p className="animate-pulse">Loading...</p>
            return <><img src={pic} alt="borjukepu" onLoad={() => props.scroll()}/><p>🐈 Csabi Borjú mód {pepsimode.value ? 'bekapcsolva' : 'kikapcsolva'}. Borjú szereti a faszt!</p></>
        }
    }, 
    {
        name: 'neofetch',
        Response: (props:{scroll:() => {}}) => {
            // cat ascii art:
            const [uptime, setUptime] = useState('0 seconds');
            useEffect(() => {
                let delta = Math.abs(new Date().getTime() - 1405670400000) / 1000;
                const years = Math.floor(delta / 31536000);
                delta -= years * 31536000;
                const days = Math.floor(delta / 86400) % 365;
                delta -= days * 86400;
                const hours = Math.floor(delta / 3600) % 24;
                delta -= hours * 3600;
                const minutes = Math.floor(delta / 60) % 60;
                delta -= minutes * 60;
                const seconds = Math.floor(delta % 60);
                setUptime(`${days} nap, ${hours} óra, ${minutes} perc, ${seconds} másodperc`);
                props.scroll();
            }, []);
            return <div className="flex flex-row gap-2">
                <p className="gradient-text w-1/2">
                ⠀⠀⠀⠀,_⠀⠀⠀⠀_,<br/>
                ⠀⠀⠀⠀|\\___//|<br/>
                ⠀⠀⠀⠀|=6⠀⠀ 6=|<br/>
                ⠀⠀⠀⠀\=._Y_.=/<br/>
                ⠀⠀⠀⠀⠀)⠀⠀`⠀⠀(⠀⠀⠀,<br/>
                ⠀⠀⠀⠀/⠀⠀⠀⠀⠀⠀\⠀⠀((<br/>
                ⠀⠀⠀⠀|⠀⠀⠀⠀⠀⠀|⠀⠀⠀))<br/>
                ⠀⠀⠀/|⠀|⠀⠀⠀|⠀|\_//<br/>
                ⠀⠀⠀\|⠀|._.|⠀|/-`<br/>
                ⠀⠀⠀⠀'"'⠀⠀⠀'"'<br/>
                </p>
                <p className="text-gray-300 w-1/2">
                    <span className="gradient-text">OS:</span> BorjuOS 1.0.0 x64<br/>
                    <span className="gradient-text">Hoszt:</span> client.undernetwork.hu<br/>
                    <span className="gradient-text">Uptime:</span> {uptime}<br/>
                    <span className="gradient-text">Képernyő:</span> {window.innerWidth}x{window.innerHeight}<br/>
                    <span className="gradient-text">CPU: </span> AMD A4-5300 (1-core)<br/>
                    <span className="gradient-text">GPU:</span> AMD Radeon HD 7480D<br/>
                    <span className="gradient-text">Memória:</span> 12GB DDR3<br/>
                </p>
            </div>
        }
    },
    {
        name: 'ls',
        Response: () => {
            return <p><span className="gradient-text font-bold">undernetwork borjukepu csabifeetpics</span> szia.php te.yml</p>
        }
    },
    {
        name: 'baguette',
        Response: (props:{scroll:() => {}}) => {
            return <img src="https://pngimg.com/uploads/baguette/baguette_PNG15.png" alt="baguette" onLoad={() => props.scroll()}/>
        }
    },
    {
        name: 'eztevagy',
        Response: (props:{scroll:() => {}}) => {
            interface Ip {city: string, region: string, country_name: string, ip: string}
            const [ip, setIp] = useState<Ip>({city:'unknown', region:'unknown', country_name:'unknown', ip:'unknown'});
            useEffect(() => {
                fetch('https://ipapi.co/json/').then(res => res.json()).then(data => {
                    setIp(data);
                    props.scroll();
                })
            }, []);
            if (!ip.city) return <p className="animate-pulse">Betöltés...</p>
            return <p>{ip.city} ({ip.region}), {ip.country_name} {ip.ip} emlékeztet valamire?</p>
        }
    },
]

export const autocomplete = (input:string) => {
    if (input === '') return '';
    const result = commands.filter(command => command.name.startsWith(input));
    if (result.length === 0) return '';
    return result[0].name.replace(input, '');
}
