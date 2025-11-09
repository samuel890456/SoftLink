function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6 mt-10">
      <div className="container mx-auto text-center text-sm">
        <p>© {new Date().getFullYear()} SoftLink - Plataforma Institucional</p>
        <p>Desarrollado por estudiantes de Tecnología en Desarrollo de Software</p>
      </div>
    </footer>
  );
}

export default Footer;
