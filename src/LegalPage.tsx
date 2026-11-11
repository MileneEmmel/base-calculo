import { useState } from "react";
import { progressKey } from "./browserStorage";
import { coefficientRangeKey } from "./labPreferences";
import { noticeKey } from "./StorageNotice";
import { contactEmail, legalUpdatedAt, responsibleName, siteName } from "./site";

const storedKeys = [
  { key: progressKey, purpose: "Lista dos códigos das questões que você marcou como concluídas." },
  { key: coefficientRangeKey, purpose: "Faixa dos coeficientes escolhida no Laboratório." },
  { key: noticeKey, purpose: "Lembra que você já leu o aviso sobre armazenamento." },
];

function Contact() {
  return contactEmail
    ? <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
    : <>os canais oficiais de contato da instituição responsável pelo projeto</>;
}

function ClearLocalData() {
  const [status, setStatus] = useState("");
  const clear = () => {
    try {
      storedKeys.forEach(({ key }) => localStorage.removeItem(key));
      setStatus("Pronto. Os dados do ∫NTEGRA foram apagados deste navegador. Recarregue a página para começar do zero.");
    } catch {
      setStatus("O navegador bloqueou o acesso ao armazenamento. Apague os dados do site nas configurações do navegador.");
    }
  };
  return <div className="legal-action">
    <button type="button" className="secondary-button" onClick={() => { if (window.confirm("Apagar progresso e preferências salvos neste navegador? Essa ação não pode ser desfeita.")) clear(); }}>Apagar meus dados deste navegador</button>
    <p role="status">{status}</p>
  </div>;
}

function Privacy() {
  return <>
    <h1 id="legal-title">Política de privacidade</h1>
    <p className="legal-updated">Última atualização: {legalUpdatedAt}</p>
    <p>Esta política explica como o {siteName} trata informações de quem usa a plataforma, de acordo com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018, LGPD).</p>

    <h2>1. Resumo</h2>
    <ul>
      <li>Não há cadastro, login, formulários, anúncios nem ferramentas de análise ou rastreamento.</li>
      <li>O site <strong>não usa cookies</strong> próprios, de publicidade ou de rastreamento.</li>
      <li>Seu progresso e suas preferências ficam salvos <strong>somente no seu navegador</strong> e nunca são enviados para nós.</li>
    </ul>

    <h2>2. Quem é o responsável</h2>
    <p>O controlador é a {responsibleName}. Dúvidas e pedidos sobre privacidade podem ser enviados por <Contact />.</p>

    <h2>3. O que fica salvo no seu navegador</h2>
    <p>Usamos o armazenamento local do navegador (<code>localStorage</code>) apenas para o funcionamento das ferramentas que você usa. Essas informações não identificam você e não saem do seu dispositivo:</p>
    <table className="legal-table">
      <thead><tr><th scope="col">Chave</th><th scope="col">Para que serve</th></tr></thead>
      <tbody>{storedKeys.map(({ key, purpose }) => <tr key={key}><td><code>{key}</code></td><td>{purpose}</td></tr>)}</tbody>
    </table>
    <p>Como esse armazenamento é estritamente necessário para oferecer o que você pediu e não envolve rastreamento, ele não exige consentimento. Mesmo assim, você pode apagá-lo a qualquer momento:</p>
    <ClearLocalData />

    <h2>4. Dados técnicos de acesso</h2>
    <p>Como qualquer site, o servidor de hospedagem recebe dados técnicos de cada acesso, como endereço IP, data e hora, navegador e página solicitada. Esses registros são tratados pelo provedor de hospedagem para entregar as páginas com segurança e evitar abusos (base legal: legítimo interesse, art. 7º, IX, da LGPD) e são mantidos apenas pelo tempo definido pelo provedor. Quando a proteção contra robôs do provedor estiver ativa, ele pode gravar um cookie técnico de segurança, que não é usado para publicidade nem para rastreamento. Não cruzamos esses registros com outras informações e não os usamos para identificar pessoas.</p>

    <h2>5. Compartilhamento</h2>
    <p>Não vendemos nem compartilhamos dados pessoais. As fontes, as fórmulas e os gráficos são carregados do próprio site, sem serviços de terceiros. Links para obras de referência, como OpenStax e Project Gutenberg, levam a sites externos com políticas próprias.</p>

    <h2>6. Crianças e adolescentes</h2>
    <p>A plataforma pode ser usada por estudantes de qualquer idade porque não coleta dados pessoais de quem a utiliza (art. 14 da LGPD).</p>

    <h2>7. Seus direitos</h2>
    <p>A LGPD garante, entre outros, os direitos de confirmação, acesso, correção, anonimização, eliminação e informação sobre o uso de dados (art. 18). Como não guardamos dados pessoais em nossos sistemas, a eliminação do progresso é feita por você, com o botão acima ou limpando os dados do site no navegador. Para qualquer outro pedido, use <Contact />. Você também pode procurar a Autoridade Nacional de Proteção de Dados (ANPD).</p>

    <h2>8. Segurança</h2>
    <p>O site é servido somente por conexão criptografada (HTTPS) e com cabeçalhos de segurança que impedem a execução de scripts de terceiros.</p>

    <h2>9. Alterações</h2>
    <p>Se esta política mudar, a nova versão será publicada nesta página com a data de atualização.</p>
  </>;
}

function Terms() {
  return <>
    <h1 id="legal-title">Termos de uso</h1>
    <p className="legal-updated">Última atualização: {legalUpdatedAt}</p>
    <p>Ao usar o {siteName}, você concorda com estes termos. Se não concordar, não utilize a plataforma.</p>

    <h2>1. O serviço</h2>
    <p>O {siteName} é um projeto de extensão universitária, gratuito e sem fins lucrativos, que oferece aulas, exercícios resolvidos e ferramentas interativas de Matemática Básica, Pré-Cálculo e Cálculo 1. O acesso não exige cadastro.</p>

    <h2>2. Finalidade educacional</h2>
    <p>O conteúdo é revisado com cuidado, mas pode conter erros. Ele complementa, e não substitui, as aulas, os livros e a orientação de professores. O projeto não se responsabiliza por decisões tomadas apenas com base no conteúdo da plataforma. Se encontrar um erro, avise por <Contact />.</p>

    <h2>3. Conteúdo e licenças</h2>
    <p>Parte dos exercícios é adaptada de obras da OpenStax, publicadas sob a licença Creative Commons Atribuição-NãoComercial-CompartilhaIgual 4.0 (CC BY-NC-SA 4.0), e de obras em domínio público do Project Gutenberg. Esse material continua sujeito à licença original, inclusive à proibição de uso comercial e à obrigação de compartilhar adaptações pela mesma licença. A fonte e a licença de cada questão aparecem nos créditos dela. O conteúdo original do projeto pode ser usado livremente para estudo pessoal e em sala de aula, com indicação da fonte; outros usos dependem de autorização.</p>

    <h2>4. Uso adequado</h2>
    <p>Não é permitido usar a plataforma para fins ilegais, tentar comprometer sua segurança ou disponibilidade, nem coletar o conteúdo de forma automatizada e em massa de modo que prejudique o acesso de outras pessoas.</p>

    <h2>5. Disponibilidade</h2>
    <p>O serviço é oferecido como está e pode passar por mudanças, interrupções ou ser descontinuado. O progresso fica salvo apenas no seu navegador e pode ser perdido se os dados do site forem apagados.</p>

    <h2>6. Privacidade</h2>
    <p>O tratamento de dados está descrito na <a href="/privacidade">Política de privacidade</a>.</p>

    <h2>7. Legislação</h2>
    <p>Estes termos seguem a legislação brasileira. Eles podem ser atualizados; a versão vigente estará sempre nesta página.</p>
  </>;
}

export default function LegalPage({ page }: { page: "privacidade" | "termos" }) {
  return <article className="legal-page" aria-labelledby="legal-title">
    {page === "privacidade" ? <Privacy /> : <Terms />}
  </article>;
}
