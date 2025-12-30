import { RegisterForm } from '@/domain/user/components/RegisterForm';
import { useNavigation } from '@/core/hooks/useNavigation';

function RegisterPage() {
  const { navigate } = useNavigation();

  const handleSuccess = () => {
    // Redirect to login or a success page
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <RegisterForm onSuccess={handleSuccess} />
    </div>
  );
}

export { RegisterPage };
